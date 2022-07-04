import { ListDetailView, NextPageWithLayout } from '~/components/layouts'
import BookList from '~/components/books/book-list'
import BookDetail from '~/components/books/book-detail'
import { GetServerSideProps } from 'next'
import { GET_VIEWER } from '~/graphql/queries/viewer'
import { addApolloState, initApolloClient } from '~/lib/apollo'
import { getContext } from '~/graphql/context'
import { GET_BOOK, GET_BOOKS } from '~/graphql/queries/book'

const BookDetailPage: NextPageWithLayout<{ id: string }> = ({ id }) => {
  return (
    <>
      <ListDetailView
        list={<BookList />}
        hasDetail
        detail={<BookDetail id={id} />}
      />
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
    apolloClient.query({ query: GET_BOOKS }),
    apolloClient.query({ query: GET_BOOK, variables: { id } }),
    apolloClient.query({ query: GET_VIEWER }),
  ])

  return addApolloState(apolloClient, {
    props: {
      id,
    },
  })
}

export default BookDetailPage
