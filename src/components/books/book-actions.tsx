import Button from '~/components/button'
import { ReactionButton } from '~/components/button/reaction-button'
import {
  useGetBookRecommendationsQuery,
  useToggleBookRecommendationMutation,
} from '~/graphql/types.generated'

type Props = { book: { id: string; url: string } }

function BookReaction({ book }: Props) {
  const { data, loading, error } = useGetBookRecommendationsQuery({
    variables: { id: book.id },
  })

  const [setRecommendation, setRecommendationResponse] =
    useToggleBookRecommendationMutation({
      variables: { id: book.id },
    })

  if (!data || loading || error) {
    return null
  }

  return (
    <ReactionButton
      key={book.id}
      hasReacted={
        setRecommendationResponse.data?.toggleBookRecommendation?.recommended ??
        data.bookRecommendations?.recommended ??
        false
      }
      count={
        setRecommendationResponse.data?.toggleBookRecommendation?.count ??
        data.bookRecommendations?.count ??
        0
      }
      onClick={() => setRecommendation()}
      loading={setRecommendationResponse.loading}
    />
  )
}

export default function BookActions({ book }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <BookReaction book={book} />
      <Button href={book.url} target="_blank">
        Visit
      </Button>
    </div>
  )
}
