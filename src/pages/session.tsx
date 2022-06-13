import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import { NextSeo } from 'next-seo'
import { LoadingSpinner } from '~/components/loading-spinner'

const SessionPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Session" />
      <ListDetailView hasDetail detail={<></>} />
    </>
  )
}

export default SessionPage
