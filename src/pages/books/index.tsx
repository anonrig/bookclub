import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import BookList from '~/components/books/book-list'

const BooksPage: NextPage = () => {
  return <ListDetailView list={<BookList />} />
}

export default BooksPage
