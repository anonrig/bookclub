import { ReadingSession } from '~/graphql/types.generated'
import { useMemo } from 'react'
import {
  timestampToCleanTime,
  timestampToDaysUntil,
  timestampToRelative,
} from '~/lib/transformers'
import { StarIcon } from '@heroicons/react/solid'

type Props = {
  session: ReadingSession
}

export default function useReadingSession({ session }: Props) {
  const dailyProgress = useMemo(() => {
    const deadline = new Date(session.deadlineAt)
    const createdAt = new Date(session.createdAt)
    const total = timestampToDaysUntil(deadline, createdAt.getTime())
    const elapsed = timestampToDaysUntil(new Date(), createdAt.getTime())
    return Math.min(100, parseFloat((elapsed / total).toFixed(2)) * 100)
  }, [session.createdAt, session.deadlineAt])

  const progress = useMemo(
    () =>
      parseInt((session.book.pageCount * (dailyProgress / 100)).toFixed(0), 10),
    [dailyProgress, session.book.pageCount]
  )

  const maximumPage = useMemo(
    () => Math.max(...session.members.map((m) => m.pageNumber)),
    [session.members]
  )

  const fastestReader = useMemo(() => {
    if (maximumPage > 0) {
      const reader = session.members.find((m) => m.pageNumber === maximumPage)

      if (reader) {
        const percentage =
          parseFloat((maximumPage / session.book.pageCount).toFixed(2)) * 100
        const message =
          maximumPage === session.book.pageCount
            ? `${reader.user.name} finished the book ${timestampToRelative(
                new Date(reader.updatedAt)
              )}`
            : `${reader.user.name} read ${reader.pageNumber} pages (${percentage}%)`

        return (
          <div className="flex flex-row items-center">
            <StarIcon className="h-5 w-5 fill-amber-400" />
            {message}
          </div>
        )
      }
    }

    return 'No one started reading yet'
  }, [maximumPage, session.book.pageCount, session.members])

  const callToAction = useMemo(() => {
    if (!session.viewer) {
      return null
    }

    const deadlineAt = timestampToCleanTime({ timestamp: session.deadlineAt })
    const updatedAt = timestampToCleanTime({
      timestamp: session.viewer.updatedAt,
    })

    // If deadline exceeded for this reading session
    if (deadlineAt.daysUntil < 0) {
      return null
    }
    // If viewer finished the book, do nothing
    else if (session.viewer.pageNumber === session.book.pageCount) {
      return null
    }
    // Viewer did not update more than 7 days ago.
    else if (updatedAt.daysUntil < -7) {
      return `Your last update was ${updatedAt.relativeDays}.`
    }
    // Viewer is behind schedule.
    else if (session.viewer.pageNumber < progress) {
      const pages = Math.round(progress - session.viewer.pageNumber)
      return `You are behind schedule. Read at least ${pages} pages to keep up!`
    }
    // Check if deadline is in the next 7 days
    else if (deadlineAt.daysUntil < 7) {
      return `Session will end in ${deadlineAt.daysUntil} days. You need to hurry!`
    }

    return null
  }, [progress, session.book.pageCount, session.deadlineAt, session.viewer])

  return {
    callToAction,
    fastestReader,
    maximumPage,
    dailyProgress,
    progress,
  }
}
