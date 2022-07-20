import {
  MutationCreateBookRecommendationArgs,
  MutationToggleBookRecommendationArgs,
} from '~/graphql/types.generated'
import { Context } from '~/graphql/context'
import {
  UserInputError,
  ForbiddenError,
  AuthenticationError,
} from 'apollo-server-errors'
import { getBookById } from '~/lib/google-books'
import TurndownService from 'turndown'
import { bookRecommendations } from '~/graphql/resolvers/queries/book-recommendations'

const turndownService = new TurndownService()

export async function createBookRecommendation(
  _: unknown,
  { data }: MutationCreateBookRecommendationArgs,
  ctx: Context
) {
  if (!ctx.viewer) {
    throw new ForbiddenError('Viewer is missing')
  }

  if (!data) {
    throw new UserInputError('Recommendation is missing')
  }

  const previousBook = await ctx.prisma.book.findUnique({
    where: {
      googleId: data.id,
    },
    include: {
      _count: {
        select: {
          recommendations: true,
        },
      },
    },
  })

  if (previousBook) {
    return previousBook
  }

  const googleBook = await getBookById(data.id)

  if (!googleBook) {
    throw new UserInputError('That book does not exist')
  }

  if (!googleBook.pageCount) {
    throw new ForbiddenError(
      'Google Books API does not include that books page count'
    )
  }

  const book = await ctx.prisma.book.create({
    data: {
      title: googleBook.title,
      subtitle: googleBook.subtitle,
      description: turndownService.turndown(googleBook.description ?? ''),
      pageCount: googleBook.pageCount,
      googleId: googleBook.id,
      authors: googleBook.authors ?? [],
      thumbnail: googleBook.imageLinks?.thumbnail,
      publishedAt: googleBook.publishedDate
        ? parseInt(googleBook.publishedDate, 10)
        : null,
      url: googleBook.previewLink,
      identifiers: googleBook.industryIdentifiers ?? [],
    },
    include: {
      _count: {
        select: {
          recommendations: true,
        },
      },
    },
  })

  await ctx.prisma.bookRecommendation.create({
    data: {
      bookId: book.id,
      userId: ctx.viewer.id,
    },
  })

  if (data.comment) {
    await ctx.prisma.comment.create({
      data: {
        bookId: book.id,
        userId: ctx.viewer.id,
        text: data.comment,
      },
    })
  }

  return book
}

export async function toggleBookRecommendation(
  _: unknown,
  { id }: MutationToggleBookRecommendationArgs,
  ctx: Context
) {
  if (!ctx.viewer) {
    throw new AuthenticationError('Viewer is missing')
  }

  const reaction = await ctx.prisma.bookRecommendation.findFirst({
    where: {
      userId: ctx.viewer.id,
      bookId: id,
    },
  })
  const query = {
    userId: ctx.viewer.id,
    bookId: id,
  }

  if (reaction) {
    await ctx.prisma.bookRecommendation.delete({
      where: {
        userId_bookId: query,
      },
    })
  } else {
    await ctx.prisma.bookRecommendation.create({
      data: query,
    })
  }

  return bookRecommendations(null, { id }, ctx)
}
