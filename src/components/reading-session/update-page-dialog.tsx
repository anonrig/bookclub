import { DialogComponent } from '~/components/dialog'
import { ReactElement, useState } from 'react'
import { Button } from '~/components/button'
import {
  ReadingSession,
  useUpdateReadingSessionPageMutation,
} from '~/graphql/types.generated'
import { LoadingSpinner } from '~/components/loading-spinner'
import { Input } from '~/components/input'
import { GET_READING_SESSION } from '~/graphql/queries/reading-session'

type Props = {
  book: ReadingSession['book']
  refetch: VoidFunction
  trigger: ReactElement
  viewer?: ReadingSession['viewer']
}

export default function UpdateReadingSessionPageDialog({
  book,
  refetch,
  trigger,
  viewer,
}: Props) {
  const [pageNumber, setPageNumber] = useState(viewer?.pageNumber ?? 0)
  const [updatePage, updatePageResponse] = useUpdateReadingSessionPageMutation({
    variables: { pageNumber },
    update(cache) {
      const session = cache.readQuery<ReadingSession>({
        query: GET_READING_SESSION,
      })

      cache.writeQuery({
        query: GET_READING_SESSION,
        data: {
          ...session,
          viewer: {
            ...(session?.viewer ?? {}),
            pageNumber,
          },
        },
      })
    },
    onCompleted() {
      refetch()
    },
  })

  return (
    <DialogComponent
      trigger={trigger}
      title="Which page are you on?"
      modalContent={({ closeModal }) => (
        <div className="text-primary flex flex-col space-y-4 p-4 text-left">
          <div className="space-y-2">
            <p className="text-primary font-semibold">Book</p>
            <div className="text-primary flex space-x-2">{book.title}</div>
          </div>

          <div className="space-y-2">
            <p className="text-primary font-semibold">Page</p>
            <Input
              autoFocus
              type="number"
              min={viewer?.pageNumber ?? 0}
              max={book.pageCount}
              defaultValue={pageNumber}
              onChange={(event) => {
                const number = parseInt(event.target.value, 10)

                if (!Number.isNaN(number)) {
                  setPageNumber(number)
                }
              }}
            />
          </div>

          <Button
            size="large"
            disabled={updatePageResponse.loading}
            onClick={async () => {
              try {
                const result = await updatePage()

                if (!result.errors) {
                  closeModal()
                }
              } catch {}
            }}
          >
            {updatePageResponse.loading ? <LoadingSpinner /> : 'Update page'}
          </Button>
        </div>
      )}
    />
  )
}
