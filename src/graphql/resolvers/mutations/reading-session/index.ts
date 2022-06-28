import { Context } from '~/graphql/context'
import {
  MutationCreateReadingSessionArgs,
  MutationAttendReadingSessionArgs,
} from '~/graphql/types.generated'
import { UserInputError } from 'apollo-server-micro'
import { timestampToCleanTime } from '~/lib/transformers'

export async function attendReadingSession(
  _: unknown,
  { data: { id } }: MutationAttendReadingSessionArgs,
  { prisma, viewer }: Context
) {
  const session = await prisma.readingSession.findUnique({
    include: {
      members: true,
    },
    where: { id },
  })

  if (!session) {
    throw new UserInputError('That session does not exist')
  }

  // If the viewer has already marked himself as a member, throw an error
  if (session.members.find((m) => m.userId === viewer?.id) || !viewer) {
    throw new UserInputError('That session already includes you as a attendee')
  }

  await prisma.readingSessionMember.create({
    data: {
      userId: viewer.id,
      readingSessionId: id,
    },
  })

  return prisma.readingSession.findUnique({
    where: { id },
    include: {
      book: true,
      members: {
        include: {
          user: true,
        },
      },
    },
  })
}

export async function createReadingSession(
  _: unknown,
  { data: { bookId, duration } }: MutationCreateReadingSessionArgs,
  { prisma }: Context
) {
  const previousSession = await prisma.readingSession.findFirst({
    include: {
      book: true,
    },
    where: {
      bookId,
    },
  })

  // If this book was previously read, throw an error to the user
  if (previousSession) {
    const timestamp = timestampToCleanTime({
      timestamp: previousSession.createdAt.toISOString(),
    })
    throw new UserInputError(
      `${previousSession.book.title} was already read on ${timestamp.formatted}`
    )
  }

  const deadlineAt = new Date()
  deadlineAt.setDate(deadlineAt.getDate() + duration * 7)

  return prisma.readingSession.create({
    data: {
      bookId,
      deadlineAt,
    },
    include: {
      book: true,
      members: {
        include: {
          user: true,
        },
      },
    },
  })
}
