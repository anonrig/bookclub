import { GhostButton } from '~/components/button'
import { TitleBar } from '~/components/list-detail/title-bar'
import { PlusIcon } from '@heroicons/react/outline'
import { MutableRefObject } from 'react'

type Props = {
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>
}

export default function BookTitleBar({ scrollContainerRef }: Props) {
  return (
    <TitleBar
      trailingAccessory={
        <div className="flex space-x-2">
          <GhostButton
            href="/books/recommend"
            size="small-square"
            aria-label="Recommend book"
          >
            <PlusIcon className="h-4 w-4" />
          </GhostButton>
        </div>
      }
      title="Books"
      scrollContainerRef={scrollContainerRef}
    />
  )
}
