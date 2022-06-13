import {
  MutationCreateBookRecommendationArgs,
  MutationToggleBookRecommendationArgs,
} from '~/graphql/types.generated'
import { Context } from '~/graphql/context'
import {
  UserInputError,
  ForbiddenError,
  AuthenticationError,
} from 'apollo-server-micro'
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

  const previousRecommendation = await ctx.prisma.bookRecommendation.findUnique(
    {
      where: {
        userId_bookId: {
          userId: ctx.viewer.id,
          bookId: data.id,
        },
      },
    }
  )

  if (previousRecommendation) {
    throw new UserInputError('That recommendation already exists')
  }

  const googleBook = await getBookById(data.id)

  if (!googleBook) {
    throw new UserInputError('That book does not exist')
  }

  const book = await ctx.prisma.book.create({
    data: {
      title: googleBook.title,
      subtitle: googleBook.subtitle,
      description: turndownService.turndown(googleBook.description),
      pageCount: googleBook.pageCount,
      googleId: googleBook.id,
      authors: googleBook.authors ?? [],
      thumbnail: googleBook.imageLinks?.thumbnail,
      publishedAt: parseInt(googleBook.publishedDate, 10),
      url: googleBook.previewLink,
      identifiers: googleBook.industryIdentifiers,
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

  if (reaction) {
    await ctx.prisma.bookRecommendation.delete({
      where: {
        userId_bookId: {
          userId: ctx.viewer.id,
          bookId: id,
        },
      },
    })
  } else {
    await ctx.prisma.bookRecommendation.create({
      data: {
        userId: ctx.viewer.id,
        bookId: id,
      },
    })
  }

  return bookRecommendations(null, { id }, ctx)
}
