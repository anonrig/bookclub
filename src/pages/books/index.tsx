import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import BookList from '~/components/books/book-list'
import { NextSeo } from 'next-seo'

const BooksPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Books" />
      <ListDetailView list={<BookList />} />
    </>
  )
}

export default BooksPage
