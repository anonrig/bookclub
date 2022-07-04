import type { GetServerSideProps, NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import { NextSeo } from 'next-seo'
import ReadingSession from '~/components/reading-session'
import { GET_VIEWER } from '~/graphql/queries/viewer'
import { getContext } from '~/graphql/context'
import { GET_READING_SESSION } from '~/graphql/queries/reading-session'
import { addApolloState, initApolloClient } from '~/lib/apollo'

const SessionPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Session" />
      <ListDetailView hasDetail detail={<ReadingSession />} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const context = await getContext(req, res)
  const client = initApolloClient({ context })

  await Promise.all([
    client.query({ query: GET_VIEWER }),
    client.query({ query: GET_READING_SESSION }),
  ])

  return addApolloState(client, {
    props: {},
  })
}

export default SessionPage
