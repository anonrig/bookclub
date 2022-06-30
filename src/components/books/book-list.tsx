import { ListContainer } from '~/components/list-detail/list-container'
import { LoadingSpinner } from '~/components/loading-spinner'
import BookListItem from '~/components/books/book-list-item'
import { createContext, useRef, useState } from 'react'
import BookTitleBar from '~/components/books/book-title-bar'
import { BookFilterType, useGetBooksQuery } from '~/graphql/types.generated'
import { useRouter } from 'next/router'

export const BookContext = createContext<{
  filter: BookFilterType | null
  setFilter: (filter: BookFilterType | null) => void
}>({
  filter: null,
  setFilter: () => {},
})

export default function BookList() {
  const router = useRouter()
  const [filter, setFilter] = useState<BookFilterType | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { data, error, loading } = useGetBooksQuery({
    variables: {
      data: {
        filter,
      },
    },
  })

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
    <BookContext.Provider value={{ filter, setFilter }}>
      <ListContainer ref={scrollContainerRef}>
        <BookTitleBar scrollContainerRef={scrollContainerRef} />

        <div className="lg:space-y-1 lg:p-3">
          {data?.books.map((book) => {
            const active = router.query?.id === book.id

            return <BookListItem key={book.id} book={book} active={active} />
          })}
        </div>
      </ListContainer>
    </BookContext.Provider>
  )
}
