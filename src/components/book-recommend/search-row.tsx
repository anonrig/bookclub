import { GoogleBook } from '~/lib/google-books'
import Image from 'next/image'

type Props = {
  active?: boolean
  book: GoogleBook
  selected?: boolean
}

export default function BookSearchRow({ active, book }: Props) {
  const activeClass = active ? 'bg-gray-50' : ''
  const classes = `flex flex-row space-x-2 items-center py-1 px-2 ${activeClass}`
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
        <span className="text-xs">
          Authors: {book.authors?.map((author) => author)}
        </span>
      </div>
    </div>
  )
}
