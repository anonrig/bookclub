import {
  ListDetailView,
  NextPageWithLayout,
  SiteLayout,
} from '~/components/layouts'
import BookList from '~/components/books/book-list'
import BookDetail from '~/components/books/book-detail'
import { GetServerSideProps } from 'next'
import { GET_VIEWER } from '~/graphql/queries/viewer'
import { addApolloState, initApolloClient } from '~/lib/apollo'
import { getContext } from '~/graphql/context'
import { GET_BOOK, GET_BOOKS } from '~/graphql/queries/book'

const BookDetailPage: NextPageWithLayout<{ id: string }> = ({ id }) => {
  return <BookDetail id={id} />
}

BookDetailPage.getLayout = (page) => {
  return (
    <SiteLayout>
      <ListDetailView list={<BookList />} hasDetail detail={page} />
    </SiteLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = params?.id as string
  const context = await getContext(req)
  const apolloClient = initApolloClient({ context })

  await apolloClient.query({
    query: GET_BOOK,
    variables: { id },
  })

  await Promise.all([
    apolloClient.query({ query: GET_VIEWER }),
    apolloClient.query({ query: GET_BOOKS }),
  ])

  return addApolloState(apolloClient, {
    props: {
      id,
    },
  })
}

export default BookDetailPage
