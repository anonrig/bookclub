import type { GetServerSideProps, NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import BookList from '~/components/books/book-list'
import { NextSeo } from 'next-seo'
import { getContext } from '~/graphql/context'
import { addApolloState, initApolloClient } from '~/lib/apollo'
import { GET_VIEWER } from '~/graphql/queries/viewer'
import { GET_BOOKS } from '~/graphql/queries/book'

const BooksPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Books" />
      <ListDetailView list={<BookList />} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const context = await getContext(req)
  const client = initApolloClient({ context })

  await Promise.all([
    client.query({ query: GET_VIEWER }),
    client.query({ query: GET_BOOKS, variables: { data: { filter: null } } }),
  ])

  return addApolloState(client, {
    props: {},
  })
}

export default BooksPage
