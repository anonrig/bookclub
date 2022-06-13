import { TitleBar } from '~/components/list-detail/title-bar'
import { MutableRefObject } from 'react'

type Props = {
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>
}

export default function MeetingsTitleBar({ scrollContainerRef }: Props) {
  return <TitleBar title="Meetings" scrollContainerRef={scrollContainerRef} />
}
