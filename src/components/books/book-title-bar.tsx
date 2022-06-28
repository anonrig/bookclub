import { GhostButton } from '~/components/button'
import { TitleBar } from '~/components/list-detail/title-bar'
import { PlusIcon } from '@heroicons/react/outline'
import { MutableRefObject } from 'react'

export default function BookTitleBar({
  scrollContainerRef,
}: {
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>
}) {
  function trailingAccessory() {
    return (
      <div className="flex space-x-2">
        <GhostButton
          href="/books/recommend"
          size="small-square"
          aria-label="Recommend book"
        >
          <PlusIcon className="h-4 w-4" />
        </GhostButton>
      </div>
    )
  }

  return (
    <TitleBar
      trailingAccessory={trailingAccessory()}
      title="Books"
      scrollContainerRef={scrollContainerRef}
    />
  )
}
