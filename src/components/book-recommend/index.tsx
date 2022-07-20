import { Detail } from '~/components/list-detail/detail'
import { TitleBar } from '~/components/list-detail/title-bar'
import { useRef, useState } from 'react'
import BookSearch from '~/components/book-recommend/search'
import { GoogleBook } from '~/lib/google-books'
import Button from '~/components/button'
import { Textarea } from '~/components/input'
import {
  BookInfoFragment,
  CreateBookRecommendationMutation,
  CreateBookRecommendationMutationResult,
  GetBookQuery,
  GetBooksQuery,
  GetBooksQueryResult,
  useCreateBookRecommendationMutation,
} from '~/graphql/types.generated'
import { LoadingSpinner } from '~/components/loading-spinner'
import { useRouter } from 'next/router'
import { GET_BOOKS } from '~/graphql/queries/book'

export default function BookRecommend() {
  const router = useRouter()
  const titleRef = useRef<HTMLParagraphElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [book, setBook] = useState<GoogleBook | null>(null)
  const [comment, setComment] = useState('')

  const [setPendingBook, setPendingBookResponse] =
    useCreateBookRecommendationMutation({
      variables: {
        data: {
          id: book?.id ?? '',
          comment,
        },
      },
      update(cache, data) {
        const result = data as CreateBookRecommendationMutationResult
        const cachedData = cache.readQuery<any>({
          query: GET_BOOKS,
        }) as GetBooksQuery

        if (cachedData?.books && result.data) {
          cache.writeQuery({
            query: GET_BOOKS,
            data: {
              __typename: cachedData.__typename,
              books: [
                result.data.createBookRecommendation,
                ...cachedData.books,
              ],
            },
          })
        }
      },
      onCompleted() {
        router.push({
          pathname: '/books',
        })
      },
    })

  return (
    <Detail.Container ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        title="Recommend"
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
      />
      <Detail.ContentContainer>
        <Detail.Header>
          <Detail.Title ref={titleRef}>Recommend</Detail.Title>
        </Detail.Header>

        <form
          className="divide-y divide-gray-200 py-12 dark:divide-gray-800"
          onSubmit={(e) => {
            e.preventDefault()

            if (!setPendingBookResponse.loading) {
              setPendingBook()
            }
          }}
        >
          <div className="space-y-8 py-12">
            <BookSearch onBookChange={setBook} />
            {book && (
              <div className="space-y-2">
                <p className="text-primary font-semibold">Comment</p>
                <div className="space-y-2">
                  <Textarea
                    autoFocus
                    autoComplete="off"
                    onChange={(e: any) => setComment(e.target.value)}
                    type="text"
                    placeholder="Tell us why you recommended this book"
                    rows={2}
                  />
                  <p className="text-quaternary text-sm">
                    Adding a comment would increase your changes to get your
                    book picked for the next session.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between space-x-4 py-12">
            <Button type="submit" disabled={!book}>
              {setPendingBookResponse.loading ? <LoadingSpinner /> : 'Save'}
            </Button>
          </div>
        </form>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
