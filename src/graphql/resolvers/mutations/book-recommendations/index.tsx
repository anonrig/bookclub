import { MutationCreateBookRecommendationArgs } from '~/graphql/types.generated'
import { Context } from '~/graphql/context'
import { UserInputError, ForbiddenError } from 'apollo-server-micro'
import { getBookById } from '~/lib/google-books'
import TurndownService from 'turndown'

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
        bookId: data.id,
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
      comment: data.comment,
      userId: ctx.viewer.id,
    },
  })

  return book
}
