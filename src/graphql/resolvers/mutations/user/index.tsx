import { MutationEditUserArgs } from '~/graphql/types.generated'
import { Context } from '~/graphql/context'
import { UserInputError } from 'apollo-server-errors'

export async function editUser(
  _: unknown,
  { data }: MutationEditUserArgs,
  ctx: Context
) {
  if (ctx.viewer) {
    const updated: { email?: string; emailVerified?: null; name?: string } = {}

    if (data?.name) {
      updated.name = data.name
    }

    if (data?.email) {
      const userByEmail = await ctx.prisma.user.findUnique({
        where: { email: data.email },
      })

      if (userByEmail) {
        throw new UserInputError('That email is taken')
      }

      updated.email = data.email
      updated.emailVerified = null
    }

    if (Object.keys(updated).length > 0) {
      return ctx.prisma.user.update({
        where: { id: ctx.viewer.id },
        data: updated,
      })
    }
  }

  return ctx.viewer
}
