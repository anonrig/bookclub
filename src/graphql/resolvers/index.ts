import { dateScalar } from '~/graphql/scalars'
import Query from '~/graphql/resolvers/queries'
import Mutation from '~/graphql/resolvers/mutations'
import { Context } from '~/graphql/context'
import {
  CommentInfoFragment,
  Role,
  ReadingSessionInfoFragment,
} from '~/graphql/types.generated'

export default {
  Date: dateScalar,
  Query,
  Mutation,
  Comment: {
    viewerCanUpdate: (
      { author }: CommentInfoFragment,
      _: unknown,
      { viewer }: Context
    ) => author.id === viewer?.id,
    viewerCanDelete: (
      { author }: CommentInfoFragment,
      _: unknown,
      { viewer }: Context
    ) => author.id === viewer?.id || viewer?.role === Role.Admin,
  },
  ReadingSession: {
    attending: (
      { members }: ReadingSessionInfoFragment,
      _: unknown,
      { viewer }: Context
    ) => {
      if (!viewer) {
        return false
      }
      return Boolean(members.find((m) => m.user.id === viewer.id))
    },
    viewer: (
      { id }: ReadingSessionInfoFragment,
      _: unknown,
      { prisma, viewer }: Context
    ) => {
      if (!viewer?.id) {
        return null
      }
      return prisma.readingSessionMember.findUnique({
        include: {
          user: true,
        },
        where: {
          userId_readingSessionId: {
            userId: viewer.id,
            readingSessionId: id,
          },
        },
      })
    },
  },
}
