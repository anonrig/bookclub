import Button, { GhostButton } from '~/components/button'
import {
  ReadingSession,
  ReadingSessionMember,
  useAttendReadingSessionMutation,
  User,
} from '~/graphql/types.generated'
import { LoadingSpinner } from '~/components/loading-spinner'
import UpdateReadingSessionPageDialog from '~/components/reading-session/update-page-dialog'
import { GET_READING_SESSION } from '~/graphql/queries/reading-session'
import { GET_VIEWER } from '~/graphql/queries/viewer'

type Props = {
  refetch: VoidFunction
  session: ReadingSession
  isFooter?: boolean
}

export default function ReadingSessionActions({
  refetch,
  session,
  isFooter,
}: Props) {
  const memberFinishedBook =
    session.viewer?.pageNumber === session.book.pageCount
  const [attend, attendResponse] = useAttendReadingSessionMutation({
    variables: {
      id: session.id,
    },
    optimisticResponse: {
      attendReadingSession: true,
    },
    update(cache) {
      const viewer = cache.readQuery<User>({ query: GET_VIEWER })
      const previous = cache.readQuery<ReadingSession>({
        query: GET_READING_SESSION,
      })

      const readingMember: ReadingSessionMember = {
        user: viewer!,
        pageNumber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      cache.writeQuery({
        query: GET_READING_SESSION,
        data: {
          ...(previous ?? {}),
          attending: true,
          members: (previous?.members ?? []).concat([readingMember]),
          viewer: readingMember,
        },
      })
    },
    onCompleted() {
      refetch()
    },
  })

  return (
    <div className="flex space-x-4 py-12">
      {!session.attending && (
        <Button disabled={attendResponse.loading} onClick={() => attend()}>
          {attendResponse.loading ? <LoadingSpinner /> : 'Attend'}
        </Button>
      )}

      {isFooter && (
        <Button href="/books/recommend" aria-label="Recommend book">
          Recommend a book
        </Button>
      )}

      {session.attending && !memberFinishedBook && (
        <UpdateReadingSessionPageDialog
          book={session.book}
          viewer={session.viewer}
          refetch={refetch}
          trigger={
            <>
              {isFooter ? (
                <Button>Update Progress</Button>
              ) : (
                <GhostButton>Update Progress</GhostButton>
              )}
            </>
          }
        />
      )}
    </div>
  )
}
