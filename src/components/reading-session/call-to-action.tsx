import { SpeakerphoneIcon } from '@heroicons/react/outline'

type Props = {
  message: string
}

export default function CallToAction({ message }: Props) {
  return (
    <div className="shadow-xs select-none rounded-lg border border-gray-150 bg-white p-2 dark:border-gray-800 dark:bg-gray-900 sm:p-3">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex w-0 flex-1 items-center">
          <span className="flex rounded-lg border border-gray-150 p-2 dark:border-gray-800 dark:bg-gray-900">
            <SpeakerphoneIcon
              className="text-secondary h-6 w-6"
              aria-hidden="true"
            />
          </span>
          <p className="text-secondary ml-3 truncate font-semibold">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
