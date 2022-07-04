import { Context } from '~/graphql/context'
import { QueryUserArgs } from '~/graphql/types.generated'

export function user(_: unknown, { id }: QueryUserArgs, { prisma }: Context) {
  return prisma.user.findUnique({
    where: { id },
  })
}
