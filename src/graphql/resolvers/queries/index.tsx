import { book, books } from '~/graphql/resolvers/queries/book'
import { bookRecommendations } from '~/graphql/resolvers/queries/book-recommendations'
import { comments } from '~/graphql/resolvers/queries/comment'
import { readingSession } from '~/graphql/resolvers/queries/reading-session'
import { viewer } from '~/graphql/resolvers/queries/viewer'

export default {
  bookRecommendations,
  book,
  books,
  comments,
  readingSession,
  viewer,
}
