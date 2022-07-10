import { ReadingSession } from '~/graphql/types.generated'
import { Tooltip } from '~/components/tooltip'
import { Avatar } from '~/components/avatar'
import useReadingSession from '~/hooks/use-reading-session'
import CallToAction from '~/components/reading-session/call-to-action'

type Props = {
  session: ReadingSession
}

export default function ReadingSessionProgress({ session }: Props) {
  const { fastestReader, dailyProgress, progress, callToAction } =
    useReadingSession({
      session,
    })

  return (
    <>
      {callToAction ? <CallToAction message={callToAction} /> : null}

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
                  style={{ left: `${dailyProgress}%` }}
                >
                  <Tooltip
                    content={`Progress is at ${progress} pages`}
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
                          (member.pageNumber / session.book.pageCount).toFixed(
                            2
                          )
                        ) * 100
                      }%`,
                    }}
                  >
                    <Tooltip
                      content={`${member.user.name ?? ''} · ${
                        member.pageNumber
                      }`}
                      placement="bottom"
                    >
                      <div>
                        <Avatar
                          user={{ name: member.user.name ?? '' }}
                          src={member.user.image ?? ''}
                          width={24}
                          height={24}
                          className="rounded-full ring-2 ring-white dark:ring-black"
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
    </>
  )
}
