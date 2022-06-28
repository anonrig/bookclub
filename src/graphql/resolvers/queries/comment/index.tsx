import { Context } from '~/graphql/context'
import { CommentType, QueryCommentsArgs } from '~/graphql/types.generated'
import { UserInputError } from 'apollo-server-micro'

function getWhereByType({ refId, type }: QueryCommentsArgs) {
  switch (type) {
    case CommentType.Book:
      return {
        bookId: refId,
      }
    case CommentType.ReadingSession:
      return {
        readingSessionId: refId,
      }
    default:
      throw new UserInputError(`Invalid type ${type}`)
  }
}

export async function comments(
  _: unknown,
  props: QueryCommentsArgs,
  ctx: Context
) {
  return ctx.prisma.comment.findMany({
    where: getWhereByType(props),
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
