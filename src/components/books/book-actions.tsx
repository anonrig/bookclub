import Button from '~/components/button'

export default function BookActions({ book }: { book: { url: string } }) {
  return (
    <div className="flex items-center space-x-2">
      <Button href={book.url} target="_blank">
        Visit
      </Button>
    </div>
  )
}
