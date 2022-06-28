import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import { NextSeo } from 'next-seo'
import ReadingSession from '~/components/reading-session'

const SessionPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Session" />
      <ListDetailView hasDetail detail={<ReadingSession />} />
    </>
  )
}

export default SessionPage
