import { Context } from '~/graphql/context'
import {
  MutationCreateReadingSessionArgs,
  MutationAttendReadingSessionArgs,
  MutationUpdateReadingSessionPageArgs,
} from '~/graphql/types.generated'
import { UserInputError } from 'apollo-server-errors'
import { timestampToCleanTime } from '~/lib/transformers'

export async function attendReadingSession(
  _: unknown,
  { id }: MutationAttendReadingSessionArgs,
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

  return true
}

export async function updateReadingSessionPage(
  _: unknown,
  { pageNumber }: MutationUpdateReadingSessionPageArgs,
  { prisma, viewer }: Context
) {
  const session = await prisma.readingSession.findFirst({
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

  if (!session || !viewer) {
    throw new UserInputError('Session does not exist')
  }

  const currentState = session.members.find((m) => m.userId === viewer.id)

  if (!currentState) {
    throw new UserInputError('That session does not have you as a member')
  }

  if (currentState.pageNumber > pageNumber) {
    throw new UserInputError(
      'That page number should not be smaller than previous page number'
    )
  }

  if (pageNumber > session.book.pageCount) {
    throw new UserInputError(
      `That book is ${session.book.pageCount} pages long, but you read more than that!`
    )
  }

  await prisma.readingSessionMember.update({
    where: {
      userId_readingSessionId: {
        userId: viewer.id,
        readingSessionId: session.id,
      },
    },
    data: {
      pageNumber,
    },
  })

  return true
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

  await prisma.readingSession.create({
    data: {
      bookId,
      deadlineAt,
    },
  })

  return true
}
