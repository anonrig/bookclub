import { Context } from '~/graphql/context'
import { AuthenticationError } from 'apollo-server-errors'
import { QueryBookRecommendationsArgs } from '~/graphql/types.generated'

export async function bookRecommendations(
  _: unknown,
  { id }: QueryBookRecommendationsArgs,
  ctx: Context
) {
  if (!ctx.viewer) {
    throw new AuthenticationError('Viewer is missing')
  }
  const [count, recommended] = await Promise.all([
    ctx.prisma.bookRecommendation.count({
      where: { bookId: id },
    }),
    ctx.prisma.bookRecommendation.findFirst({
      where: { bookId: id, userId: ctx.viewer.id },
    }),
  ])

  return { count, recommended: Boolean(recommended) }
}
