import { book, books } from '~/graphql/resolvers/queries/book'
import { bookRecommendations } from '~/graphql/resolvers/queries/book-recommendations'
import { comments } from '~/graphql/resolvers/queries/comment'
import { viewer } from '~/graphql/resolvers/queries/viewer'

export default {
  bookRecommendations,
  book,
  books,
  comments,
  viewer,
}
