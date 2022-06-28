import { Context } from '~/graphql/context'
import {
  CommentType,
  MutationAddCommentArgs,
  MutationRemoveCommentArgs,
  MutationUpdateCommentArgs,
} from '~/graphql/types.generated'
import { UserInputError } from 'apollo-server-micro'

export async function addComment(
  _: unknown,
  { text, refId, type }: MutationAddCommentArgs,
  ctx: Context
) {
  switch (type) {
    case CommentType.Book: {
      return ctx.prisma.comment.create({
        data: {
          bookId: refId,
          userId: ctx.viewer!.id,
          text,
        },
        include: {
          author: true,
        },
      })
    }
    case CommentType.ReadingSession:
      return ctx.prisma.comment.create({
        data: {
          readingSessionId: refId,
          userId: ctx.viewer!.id,
          text,
        },
        include: {
          author: true,
        },
      })
    default:
      throw new UserInputError('Invalid comment type')
  }
}
export async function updateComment(
  _: unknown,
  { text, id }: MutationUpdateCommentArgs,
  ctx: Context
) {
  await ctx.prisma.comment.updateMany({
    where: { id, userId: ctx.viewer!.id },
    data: { text },
  })

  return ctx.prisma.comment.findFirst({
    where: { id, userId: ctx.viewer!.id },
    include: {
      author: true,
    },
  })
}

export async function removeComment(
  _: unknown,
  { id }: MutationRemoveCommentArgs,
  ctx: Context
) {
  const { count } = await ctx.prisma.comment.deleteMany({
    where: { id, userId: ctx.viewer!.id },
  })

  return count > 0
}
