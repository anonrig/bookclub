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
  const classes = `flex flex-row space-x-2 items-center py-2 px-3.5 cursor-pointer ${activeClass}`
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
    <div className={classes}>
      <Image
        alt={book.title}
        src={
          book.imageLinks?.smallThumbnail ??
          'http://books.google.com/books/content?id=N3TGDgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
        }
        width={24}
        height={24}
        className="rounded-lg"
      />
      <div className="space-y-0 py-0 shrink">
        <span className="text-primary line-clamp-1 text-sm">{book.title}</span>
        <span className="text-xs line-clamp-1 text-gray-900 text-opacity-40 dark:text-white dark:text-opacity-60">
          {subtitle}
        </span>
      </div>
    </div>
  )
}
