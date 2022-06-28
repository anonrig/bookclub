import { Context } from '~/graphql/context'

export async function readingSession(_: unknown, __: unknown, ctx: Context) {
  const session = await ctx.prisma.readingSession.findFirst({
    include: {
      book: true,
      members: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      deadlineAt: 'desc',
    },
  })

  if (!session) {
    return null
  }

  return session
}
