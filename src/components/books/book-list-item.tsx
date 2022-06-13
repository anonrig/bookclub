import { Book } from '~/graphql/types.generated'
import { ListItem } from '~/components/list-detail/list-item'
import Image from 'next/image'

type Props = {
  active: boolean
  book: {
    id: string
    title: string
    thumbnail?: string | null
    authors: string[]
  }
}

export default function BookListItem({ active, book }: Props) {
  const leadingAccessory = book.thumbnail ? (
    <Image
      alt={`The cover of "${book.title}"`}
      src={book.thumbnail}
      width={32}
      height={32}
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
      byline={book.authors.at(0)}
    />
  )
}
