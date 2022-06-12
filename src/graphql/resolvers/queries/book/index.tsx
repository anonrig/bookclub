import { Context } from '~/graphql/context'
import { QueryBookArgs } from '~/graphql/types.generated'

export function books(_: unknown, __: unknown, ctx: Context) {
  return ctx.prisma.book.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function book(_: unknown, { id }: QueryBookArgs, ctx: Context) {
  const recommendation = await ctx.prisma.bookRecommendation.findFirst({
    where: {
      bookId: id,
    },
    include: {
      user: true,
      book: true,
    },
  })

  if (!recommendation) {
    return null
  }

  return {
    ...recommendation.book,
    recommendedBy: recommendation.user,
  }
}
