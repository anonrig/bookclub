import Button from '~/components/button'
import { ReactionButton } from '~/components/button/reaction-button'
import {
  Role,
  useGetBookRecommendationsQuery,
  useToggleBookRecommendationMutation,
  ViewerQuery,
} from '~/graphql/types.generated'
import { useCallback, useMemo } from 'react'
import CreateReadingSessionDialog from '~/components/reading-session/create-dialog'
import { GlobeAltIcon, ShareIcon, StarIcon } from '@heroicons/react/outline'

type Props = {
  book: { id: string; url: string; title: string; pageCount: number }
  viewer: ViewerQuery['viewer']
}

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

export default function BookActions({ book, viewer }: Props) {
  const sharingAvailable =
    typeof window !== 'undefined' && window.navigator.share
  const startSessionButton = useMemo(() => {
    if (viewer?.role === Role.Admin) {
      return (
        <CreateReadingSessionDialog
          book={book}
          trigger={
            <Button>
              <StarIcon className="h-4 w-4" />
            </Button>
          }
        />
      )
    }
    return null
  }, [book, viewer?.role])

  return (
    <div className="flex items-center space-x-2">
      {startSessionButton}
      <BookReaction book={book} viewer={viewer} />
      <Button href={book.url} target="_blank">
        <GlobeAltIcon className="h-4 w-4" />
      </Button>
      {sharingAvailable && (
        <Button
          onClick={() => {
            window.navigator.share({
              title: book.title,
              url: `https://nizipli.com/books/${book.id}`,
            })
          }}
        >
          <ShareIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
