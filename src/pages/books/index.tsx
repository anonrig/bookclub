import type { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { ListDetailView } from '~/components/layouts'
import BookList from '~/components/books/book-list'
import { getContext } from '~/graphql/context'
import { GET_VIEWER } from '~/graphql/queries/viewer'
import { GET_BOOKS } from '~/graphql/queries/book'
import { addApolloState, initApolloClient } from '~/lib/apollo'

const BooksPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Books" />
      <ListDetailView list={<BookList />} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const context = await getContext(req, res)
  const client = initApolloClient({ context })

  await Promise.all([
    client.query({ query: GET_VIEWER }),
    client.query({ query: GET_BOOKS }),
  ])

  return addApolloState(client, {
    props: {},
  })
}

export default BooksPage
