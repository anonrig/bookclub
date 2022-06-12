import { GhostButton } from '~/components/button'
import { TitleBar } from '~/components/list-detail/title-bar'
import { PlusIcon } from '@heroicons/react/outline'
import { MutableRefObject } from 'react'

export default function BookTitleBar({
  scrollContainerRef,
}: {
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>
}) {
  function getAddButton() {
    return (
      <GhostButton
        href="/books/recommend"
        size="small-square"
        aria-label="Recommend book"
      >
        <PlusIcon className="w-4 h-4" />
      </GhostButton>
    )
  }
  function trailingAccessory() {
    return <div className="flex space-x-2">{getAddButton()}</div>
  }

  return (
    <TitleBar
      trailingAccessory={trailingAccessory()}
      title="Books"
      scrollContainerRef={scrollContainerRef}
    />
  )
}
