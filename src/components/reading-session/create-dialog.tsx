import { DialogComponent } from '~/components/dialog'
import { ReactElement, useMemo, useState } from 'react'
import { Tooltip } from '~/components/tooltip'
import { Button } from '~/components/button'
import { timestampToCleanTime } from '~/lib/transformers'

type Props = {
  book: { id: string; title: string; url: string; pageCount: number }
  trigger: ReactElement
}

export default function CreateReadingSessionDialog({ book, trigger }: Props) {
  const recommendedDuration = Math.floor(book.pageCount / 20)
  const durations = useMemo(() => {
    return [2, 4, 6, 8, 10].map((value) => {
      const timestamp = new Date()
      timestamp.setDate(timestamp.getDate() + value * 7)

      return {
        id: `${value}-weeks`,
        title: `${value} Weeks (${
          timestampToCleanTime({
            timestamp: timestamp.toISOString(),
          }).formatted
        })`,
        value,
      }
    })
  }, [])
  const [duration, setDuration] = useState(() => {
    const week = Math.ceil(recommendedDuration / 7)
    return durations.find((d) => d.value > week)?.value ?? 4
  })

  return (
    <DialogComponent
      trigger={trigger}
      title="New Session"
      modalContent={() => (
        <div className="text-primary flex flex-col space-y-4 p-4 text-left">
          <div className="space-y-2">
            <p className="text-primary font-semibold">Book</p>
            <div className="text-primary flex space-x-2">{book.title}</div>
          </div>

          <div className="space-y-2">
            <p className="text-primary font-semibold">Pages</p>
            <div className="text-primary flex space-x-2">
              {book.pageCount} pages will take around
              <Tooltip
                content="Average person reads 20 to 30 pages per day."
                placement="bottom-start"
              >
                <div className="ml-1 underline">
                  {Math.floor(book.pageCount / 20)} days
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-primary font-semibold">Duration</p>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={duration}
              onChange={(event) => {
                setDuration(parseInt(event.target.value))
              }}
            >
              {durations.map((duration) => (
                <option key={duration.id} value={duration.value}>
                  {duration.title}
                </option>
              ))}
            </select>
          </div>

          <Button size="large">Start reading</Button>
        </div>
      )}
    />
  )
}
