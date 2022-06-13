import { useRef } from 'react'
import { ListContainer } from '~/components/list-detail/list-container'
import MeetingsTitleBar from '~/components/meetings/meetings-title-bar'

export default function MeetingsList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <ListContainer ref={scrollContainerRef}>
      <MeetingsTitleBar scrollContainerRef={scrollContainerRef} />
    </ListContainer>
  )
}
