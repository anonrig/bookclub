import { requiresAdmin, requiresUser } from '~/graphql/helpers'
import { editUser } from '~/graphql/resolvers/mutations/user'
import {
  createBookRecommendation,
  toggleBookRecommendation,
} from '~/graphql/resolvers/mutations/book-recommendations'
import {
  addComment,
  updateComment,
  removeComment,
} from '~/graphql/resolvers/mutations/comment'
import {
  attendReadingSession,
  createReadingSession,
  updateReadingSessionPage,
} from '~/graphql/resolvers/mutations/reading-session'

export default {
  editUser: requiresUser(editUser),

  createBookRecommendation: requiresUser(createBookRecommendation),
  toggleBookRecommendation: requiresUser(toggleBookRecommendation),

  addComment: requiresUser(addComment),
  updateComment: requiresUser(updateComment),
  removeComment: requiresUser(removeComment),

  attendReadingSession: requiresUser(attendReadingSession),
  createReadingSession: requiresAdmin(createReadingSession),
  updateReadingSessionPage: requiresUser(updateReadingSessionPage),
}
