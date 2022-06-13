import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import { NextSeo } from 'next-seo'
import MeetingsList from '~/components/meetings/meetings-list'

const MeetingsPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Meetings" />
      <ListDetailView list={<MeetingsList />} />
    </>
  )
}

export default MeetingsPage
