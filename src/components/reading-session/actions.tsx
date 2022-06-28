import Button, { GhostButton } from '~/components/button'
import { useAttendReadingSessionMutation } from '~/graphql/types.generated'
import { LoadingSpinner } from '~/components/loading-spinner'
import { ATTEND_READING_SESSION } from '~/graphql/mutations/reading-session'
import { GET_READING_SESSION } from '~/graphql/queries/reading-session'

type Props = {
  session: { id: string; attending: boolean; book: { url: string } }
  isFooter?: boolean
}

export default function ReadingSessionActions({ session, isFooter }: Props) {
  const [attend, attendResponse] = useAttendReadingSessionMutation({
    variables: {
      data: { id: session.id },
    },
  })

  return (
    <div className="flex space-x-4 py-12">
      <Button href={session.book.url} target="_blank">
        Get book
      </Button>

      {!session.attending && (
        <Button disabled={attendResponse.loading} onClick={() => attend()}>
          {attendResponse.loading ? <LoadingSpinner /> : 'Attend'}
        </Button>
      )}

      {isFooter && session.attending && (
        <GhostButton disabled={true}>Update page</GhostButton>
      )}
    </div>
  )
}
