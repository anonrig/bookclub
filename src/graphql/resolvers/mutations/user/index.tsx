import { MutationEditUserArgs } from '~/graphql/types.generated'
import { Context } from '~/graphql/context'
import { UserInputError } from 'apollo-server-micro'

export async function editUser(
  _: unknown,
  { data }: MutationEditUserArgs,
  ctx: Context
) {
  if (data?.email && ctx.viewer) {
    const userByEmail = await ctx.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (userByEmail) {
      throw new UserInputError('That email is taken')
    }

    return ctx.prisma.user.update({
      where: { email: ctx.viewer.email },
      data: {
        email: data.email,
        emailVerified: null,
      },
    })
  }

  return ctx.viewer
}
