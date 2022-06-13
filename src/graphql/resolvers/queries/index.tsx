import { viewer } from '~/graphql/resolvers/queries/viewer'
import { book, books } from '~/graphql/resolvers/queries/book'
import { bookRecommendations } from '~/graphql/resolvers/queries/book-recommendations'

export default {
  bookRecommendations,
  book,
  books,
  viewer,
}
