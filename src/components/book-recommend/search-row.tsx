import { GoogleBook } from '~/lib/google-books'
import Image from 'next/image'
import { timestampToCleanTime } from '~/lib/transformers'

type Props = {
  active?: boolean
  book: GoogleBook
  selected?: boolean
}

export default function BookSearchRow({ active, book }: Props) {
  const activeClass = active ? 'bg-gray-50 dark:bg-gray-800' : ''
  const classes = `flex flex-row space-x-2 items-center py-2 px-3.5 ${activeClass} ${
    book.pageCount ? 'cursor-pointer' : 'cursor-not-allowed'
  }`
  const authors =
    book.authors && book.authors.length > 0
      ? `Written by ${book.authors.join(', ')}. `
      : ''
  const publishedAt = book.publishedDate
    ? book.publishedDate?.length === 4
      ? book.publishedDate
      : timestampToCleanTime({ timestamp: book.publishedDate }).formatted
    : null
  const publishedAtSuffix = publishedAt ? `Released at ${publishedAt}` : ''
  const subtitle = `${authors}${publishedAtSuffix}`

  return (
    <div
      className={classes}
      style={{
        opacity: book.pageCount ? 1 : 0.4,
      }}
    >
      {book.imageLinks?.smallThumbnail && (
        <div className="flex-shrink-0">
          <Image
            alt={book.title}
            src={book.imageLinks.smallThumbnail}
            width={32}
            height={44}
            className="rounded-md"
          />
        </div>
      )}
      <div className="shrink space-y-0 py-0">
        <span className="text-primary text-sm line-clamp-1">{book.title}</span>
        <span className="text-xs text-gray-900 text-opacity-40 line-clamp-1 dark:text-white dark:text-opacity-60">
          {subtitle}
        </span>
      </div>
    </div>
  )
}
