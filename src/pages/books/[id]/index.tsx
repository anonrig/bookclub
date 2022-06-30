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
import { GET_COMMENTS } from '~/graphql/queries/comment'
import { CommentType } from '~/graphql/types.generated'

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
    apolloClient.query({
      query: GET_BOOKS,
      variables: { data: { filter: null } },
    }),
    apolloClient.query({
      query: GET_COMMENTS,
      variables: {
        refId: id,
        type: CommentType.Book,
      },
    }),
  ])

  return addApolloState(apolloClient, {
    props: {
      id,
    },
  })
}

export default BookDetailPage
