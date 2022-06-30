import Button, { GhostButton } from '~/components/button'
import {
  ReadingSession,
  useAttendReadingSessionMutation,
} from '~/graphql/types.generated'
import { LoadingSpinner } from '~/components/loading-spinner'
import UpdateReadingSessionPageDialog from '~/components/reading-session/update-page-dialog'

type Props = {
  session: ReadingSession
  isFooter?: boolean
}

export default function ReadingSessionActions({ session, isFooter }: Props) {
  const [attend, attendResponse] = useAttendReadingSessionMutation({
    variables: {
      id: session.id,
    },
  })

  return (
    <div className="flex space-x-4 py-12">
      {isFooter && (
        <Button href={session.book.url} target="_blank">
          Get book
        </Button>
      )}

      {!session.attending ? (
        <Button disabled={attendResponse.loading} onClick={() => attend()}>
          {attendResponse.loading ? <LoadingSpinner /> : 'Attend'}
        </Button>
      ) : (
        <UpdateReadingSessionPageDialog
          book={session.book}
          viewer={session.viewer}
          trigger={
            <>
              {isFooter ? (
                <Button>Update page</Button>
              ) : (
                <GhostButton>Update page</GhostButton>
              )}
            </>
          }
        />
      )}
    </div>
  )
}
