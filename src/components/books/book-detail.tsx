import { useGetBookQuery } from '~/graphql/types.generated'
import { Detail } from '~/components/list-detail/detail'
import { useRef } from 'react'
import { TitleBar } from '~/components/list-detail/title-bar'
import BookActions from '~/components/books/book-actions'
import Image from 'next/image'
import { MarkdownRenderer } from '~/components/markdown-renderer'

type Props = {
  id: string
}

export default function BookDetail({ id }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const { data, loading, error } = useGetBookQuery({ variables: { id } })

  if (loading) {
    return <Detail.Loading />
  }

  if (!data?.book || error) {
    return <Detail.Null />
  }

  return (
    <Detail.Container ref={scrollContainerRef}>
      <TitleBar
        backButton
        globalMenu={false}
        backButtonHref={'/books'}
        magicTitle
        title={data.book.title}
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
        trailingAccessory={<BookActions book={data.book} />}
      />

      <Detail.ContentContainer>
        <Detail.Header>
          <div className="flex items-center space-x-6">
            {data.book.thumbnail && (
              <Image
                alt={`Cover of "${data.book.title}"`}
                src={data.book.thumbnail}
                width={80}
                height={80}
                layout="fixed"
                objectFit="contain"
                className="rounded-2xl"
              />
            )}
            <div>
              <Detail.Title ref={titleRef}>{data.book.title}</Detail.Title>
              <div className="flex flex-col">
                <div className="text-tertiary inline-block leading-snug">
                  Written by {data.book.authors.at(0)} and published on{' '}
                  {data.book.publishedAt}.
                </div>
              </div>
            </div>
          </div>
        </Detail.Header>

        <MarkdownRenderer className="prose mt-8">
          {data.book.description}
        </MarkdownRenderer>

        <div className="py-6" />
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
