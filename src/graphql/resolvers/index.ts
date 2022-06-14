import { dateScalar } from '~/graphql/scalars'
import Query from '~/graphql/resolvers/queries'
import Mutation from '~/graphql/resolvers/mutations'
import { Context } from '~/graphql/context'
import { CommentInfoFragment, Role } from '~/graphql/types.generated'

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
}
