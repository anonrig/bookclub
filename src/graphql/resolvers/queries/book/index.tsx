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
