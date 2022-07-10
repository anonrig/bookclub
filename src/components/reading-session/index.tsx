import {
  CommentType,
  useReadingSessionQuery,
  ReadingSession as ReadingSessionType,
} from '~/graphql/types.generated'
import { Detail } from '~/components/list-detail/detail'
import { TitleBar } from '~/components/list-detail/title-bar'
import { useRef } from 'react'
import { Comments } from '~/components/comments'
import Link from 'next/link'
import ReadingSessionActions from '~/components/reading-session/actions'
import { timestampToCleanTime } from '~/lib/transformers'
import ReadingSessionProgress from '~/components/reading-session/progress-bar'
import { Tooltip } from '~/components/tooltip'
import { Avatar } from '~/components/avatar'

export default function ReadingSession() {
  const { data, loading, refetch } = useReadingSessionQuery()

  const titleRef = useRef<HTMLParagraphElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  if (loading || !data) {
    return <Detail.Loading />
  }

  if (!data.readingSession) {
    return (
      <Detail.Null
        title="Session"
        subtitle="We're not reading any book right now"
        description="Please recommend a new book, if you haven't already."
        action={{
          href: '/books',
          title: 'Go to Recommendations',
        }}
      />
    )
  }

  const deadline = timestampToCleanTime({
    timestamp: data.readingSession.deadlineAt,
  })

  return (
    <Detail.Container ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        title="Session"
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
        trailingAccessory={
          <ReadingSessionActions
            refetch={refetch}
            session={data.readingSession as ReadingSessionType}
          />
        }
      />
      <Detail.ContentContainer>
        <Detail.Header>
          <Detail.Title ref={titleRef}>Session</Detail.Title>
          <p className="text-tertiary space-x-1 text-xl">
            <span>{data.readingSession.book.title}</span>
            <span>·</span>
            <Link href={`/books/${data.readingSession.book.id}`}>
              <a className="cursor-pointer font-medium text-blue-500">
                View book
              </a>
            </Link>
          </p>
        </Detail.Header>

        <div className="divide-y divide-gray-200 py-12 dark:divide-gray-800">
          <div className="space-y-8 py-12">
            <ReadingSessionProgress
              session={data.readingSession as ReadingSessionType}
            />

            <div className="space-y-2">
              <p className="text-primary font-semibold">Deadline</p>

              <div className="text-primary flex space-x-2">
                <span>
                  {deadline.formatted}{' '}
                  <span className="text-tertiary">
                    {deadline.daysUntil > 0
                      ? `(${deadline.daysUntil} days left)`
                      : ''}
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-primary font-semibold">Next meeting</p>

              <div className="text-primary flex space-x-2">
                <span>June 1, 2022</span>
                <span>·</span>
                <Link href="/meetings">
                  <a className="cursor-pointer font-medium text-blue-500">
                    View all
                  </a>
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-primary font-semibold">Attendants</p>

              <div className="text-primary flex flex-col space-y-2">
                <div className="flex-shrink-0">
                  <div className="flex -space-x-1 overflow-hidden">
                    {data.readingSession.members.length === 0
                      ? 'Nobody yet'
                      : null}
                    {data.readingSession.members.map((member) => (
                      <Link
                        key={member.user.id}
                        href={{
                          pathname: '/u/[id]',
                          query: { id: member.user.id },
                        }}
                      >
                        <a>
                          <Tooltip
                            content={member.user.name ?? ''}
                            placement="bottom"
                          >
                            <div>
                              <Avatar
                                className="inline-block rounded-full ring-2 ring-white dark:ring-black"
                                user={{ name: member.user.name ?? '' }}
                                src={member.user.image ?? ''}
                                width={24}
                                height={24}
                              />
                            </div>
                          </Tooltip>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ReadingSessionActions
              isFooter
              refetch={refetch}
              session={data.readingSession as ReadingSessionType}
            />
          </div>

          <Comments
            refId={data.readingSession.id}
            type={CommentType.ReadingSession}
          />
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
