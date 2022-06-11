import ReactVisibilitySensor from 'react-visibility-sensor'

import { LoadingSpinner } from '~/components/loading-spinner'

export function ListLoadMore({
  setIsVisible,
}: {
  setIsVisible: (visible: boolean) => void
}) {
  return (
    <ReactVisibilitySensor
      partialVisibility
      onChange={(visible: boolean) => setIsVisible(visible)}
    >
      <div className="flex w-full items-center justify-center p-4">
        <LoadingSpinner />
      </div>
    </ReactVisibilitySensor>
  )
}
