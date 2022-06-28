import { ListContainer } from '~/components/list-detail/list-container'
import { LoadingSpinner } from '~/components/loading-spinner'
import BookListItem from '~/components/books/book-list-item'
import { useRef } from 'react'
import BookTitleBar from '~/components/books/book-title-bar'
import { useGetBooksQuery } from '~/graphql/types.generated'
import { useRouter } from 'next/router'

export default function BookList() {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { data, error, loading } = useGetBooksQuery()

  if (error) {
    return (
      <ListContainer ref={scrollContainerRef}>
        <div />
      </ListContainer>
    )
  }

  if (loading || !data?.books) {
    return (
      <ListContainer ref={scrollContainerRef}>
        <BookTitleBar scrollContainerRef={scrollContainerRef} />
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer ref={scrollContainerRef}>
      <BookTitleBar scrollContainerRef={scrollContainerRef} />

      <div className="lg:space-y-1 lg:p-3">
        {data?.books.map((book) => {
          const active = router.query?.id === book.id

          return <BookListItem key={book.id} book={book} active={active} />
        })}
      </div>
    </ListContainer>
  )
}
