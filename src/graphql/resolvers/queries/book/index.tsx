import { Context } from '~/graphql/context'
import {
  BookFilterType,
  QueryBookArgs,
  QueryBooksArgs,
} from '~/graphql/types.generated'

export function books(
  _: unknown,
  { data }: QueryBooksArgs,
  { prisma }: Context
) {
  switch (data?.filter) {
    case BookFilterType.PageCount:
      return prisma.book.findMany({
        orderBy: {
          pageCount: 'desc',
        },
      })
    case BookFilterType.RecommendationCount:
      return prisma.book.findMany({
        orderBy: {
          recommendations: {
            _count: 'desc',
          },
        },
      })
    default:
      return prisma.book.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
  }
}

export async function book(_: unknown, { id }: QueryBookArgs, ctx: Context) {
  const book = await ctx.prisma.book.findFirst({
    where: { id },
  })

  const recommendations = await ctx.prisma.bookRecommendation.count({
    where: {
      bookId: id,
    },
  })

  return {
    ...book,
    recommendations,
  }
}
