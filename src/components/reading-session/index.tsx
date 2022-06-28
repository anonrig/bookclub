import {
  CommentType,
  useGetViewerWithSettingsQuery,
} from '~/graphql/types.generated'
import { Detail } from '~/components/list-detail/detail'
import { TitleBar } from '~/components/list-detail/title-bar'
import { useRef } from 'react'
import { Comments } from '~/components/comments'
import { Tooltip } from '~/components/tooltip'
import Link from 'next/link'
import ReadingSessionActions from '~/components/reading-session/actions'

const applicants = [
  {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    email: 'floy.dmiles@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export default function ReadingSession() {
  const { data, loading } = useGetViewerWithSettingsQuery({
    fetchPolicy: 'network-only',
  })

  const titleRef = useRef<HTMLParagraphElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  if (!data?.viewer && loading) {
    return <Detail.Loading />
  }

  return (
    <Detail.Container ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        title="Session"
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
        trailingAccessory={<ReadingSessionActions />}
      />
      <Detail.ContentContainer>
        <Detail.Header>
          <Detail.Title ref={titleRef}>Session</Detail.Title>
          <p className="text-tertiary text-xl">Project Hail Mary</p>
        </Detail.Header>

        <div className="divide-y divide-gray-200 py-12 dark:divide-gray-800">
          <div className="space-y-8 py-12">
            <div className="space-y-2">
              <p className="text-primary font-semibold">Author</p>

              <div className="text-primary flex space-x-2">
                <span>Andy Weir</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-primary font-semibold">Deadline</p>

              <div className="text-primary flex space-x-2">
                <span>
                  Until June 1, 2022{' '}
                  <span className="text-tertiary">(32 days left)</span>
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

              <div className="text-primary flex space-x-2">
                <div className="flex-shrink-0">
                  <div className="flex -space-x-1 overflow-hidden">
                    {applicants.map((applicant) => (
                      <Link
                        key={applicant.email}
                        href={{
                          pathname: '/u/[id]',
                          query: { id: applicant.email },
                        }}
                      >
                        <a>
                          <Tooltip content={applicant.name} placement="bottom">
                            <img
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                              src={applicant.imageUrl}
                              alt={applicant.name}
                            />
                          </Tooltip>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ReadingSessionActions isFooter />
          </div>

          <Comments refId={'1'} type={CommentType.Book} />
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
