import Image from 'next/image'
import { ListItem } from '~/components/list-detail/list-item'
import { BookInfoFragment } from '~/graphql/types.generated'

type Props = {
  active: boolean
  book: BookInfoFragment
}

export default function BookListItem({ active, book }: Props) {
  const leadingAccessory = book.thumbnail ? (
    <Image
      alt={`The cover of "${book.title}"`}
      src={book.thumbnail}
      width={32}
      height={44}
      className="rounded-md"
      objectPosition="center"
      objectFit="cover"
    />
  ) : null

  return (
    <ListItem
      key={book.id}
      title={book.title}
      leadingAccessory={leadingAccessory}
      active={active}
      href={`/books/${book.id}`}
      byline={`${book.authors.at(0)} (${book._count.recommendations} people)`}
    />
  )
}
