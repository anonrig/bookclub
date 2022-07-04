import { ListDetailView, NextPageWithLayout } from '~/components/layouts'
import { GetServerSideProps } from 'next'
import { GET_VIEWER } from '~/graphql/queries/viewer'
import { addApolloState, initApolloClient } from '~/lib/apollo'
import { getContext } from '~/graphql/context'
import { GET_USER } from '~/graphql/queries/user'
import UserDetail from '~/components/user'

const UserDetailPage: NextPageWithLayout<{ id: string }> = ({ id }) => {
  return (
    <>
      <ListDetailView hasDetail detail={<UserDetail id={id} />} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const id = params?.id as string
  const context = await getContext(req, res)
  const apolloClient = initApolloClient({ context })

  await Promise.all([
    apolloClient.query({ query: GET_VIEWER }),
    apolloClient.query({ query: GET_USER, variables: { id } }),
  ])

  return addApolloState(apolloClient, {
    props: {
      id,
    },
  })
}

export default UserDetailPage
