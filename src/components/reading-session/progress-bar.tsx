import { ReadingSession } from '~/graphql/types.generated'
import { Tooltip } from '~/components/tooltip'
import { useMemo } from 'react'
import { Avatar } from '~/components/avatar'
import { timestampToDaysUntil } from '~/lib/transformers'
import { StarIcon } from '@heroicons/react/solid'

type Props = {
  session: ReadingSession
}

export default function ReadingSessionProgress({ session }: Props) {
  const currentProgress = useMemo(() => {
    const deadline = new Date(session.deadlineAt)
    const createdAt = new Date(session.createdAt)
    const total = timestampToDaysUntil(deadline, createdAt.getTime())
    const elapsed = timestampToDaysUntil(new Date(), createdAt.getTime())
    return parseFloat((elapsed / total).toFixed(2)) * 100
  }, [session.createdAt, session.deadlineAt])

  const fastestReader = useMemo(() => {
    const maximumPage = Math.max(...session.members.map((m) => m.pageNumber))

    if (maximumPage > 0) {
      const reader = session.members.find((m) => m.pageNumber === maximumPage)

      if (reader) {
        const percentage =
          parseFloat((maximumPage / session.book.pageCount).toFixed(2)) * 100
        return (
          <div className="flex flex-row items-center">
            <StarIcon className="h-5 w-5 fill-amber-400" />
            {`${reader.user.name} read ${reader.pageNumber} pages (${percentage}%)`}
          </div>
        )
      }
    }

    return 'No one started reading yet'
  }, [session.book.pageCount, session.members])

  return (
    <div className="space-y-2 rounded-md bg-gray-50 py-4 px-4 dark:bg-gray-900">
      <p className="text-primary font-semibold">Progress</p>

      <div className="space-y-4">
        <div className="text-primary flex space-x-2">
          <span>{fastestReader}</span>
        </div>

        {session.members.length > 0 && (
          <div className="text-primary flex flex-col space-y-2">
            <div className="relative w-full bg-slate-100 md:rounded-full">
              <div className="h-2 rounded-xl bg-slate-700"></div>
              <div
                className="absolute -top-1/2 -translate-x-1/2"
                style={{ left: `${currentProgress}%` }}
              >
                <Tooltip
                  content={`Progress should be at least ${currentProgress} pages`}
                  placement="bottom"
                >
                  <div className="h-4 w-1 w-1 rounded-full bg-slate-700 bg-slate-700"></div>
                </Tooltip>
              </div>
              {session.members.map((member) => (
                <div
                  className="absolute -top-full -translate-x-1/2"
                  key={member.user.id}
                  style={{
                    left: `${
                      parseFloat(
                        (member.pageNumber / session.book.pageCount).toFixed(2)
                      ) * 100
                    }%`,
                  }}
                >
                  <Tooltip
                    content={`${member.user.name ?? ''} · ${member.pageNumber}`}
                    placement="bottom"
                  >
                    <div>
                      <Avatar
                        user={{ name: member.user.name ?? '' }}
                        src={member.user.image ?? ''}
                        className="h-6 w-6 rounded-full"
                      />
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
