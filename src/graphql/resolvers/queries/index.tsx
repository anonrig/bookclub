import { book, books } from '~/graphql/resolvers/queries/book'
import { bookRecommendations } from '~/graphql/resolvers/queries/book-recommendations'
import { comments } from '~/graphql/resolvers/queries/comment'
import { readingSession } from '~/graphql/resolvers/queries/reading-session'
import { user } from '~/graphql/resolvers/queries/user'
import { viewer } from '~/graphql/resolvers/queries/viewer'
import { requiresUser } from '~/graphql/helpers'

export default {
  bookRecommendations: requiresUser(bookRecommendations),
  book: requiresUser(book),
  books: requiresUser(books),
  comments: requiresUser(comments),
  readingSession: requiresUser(readingSession),
  user: requiresUser(user),
  viewer: requiresUser(viewer),
}
