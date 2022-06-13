import { requiresUser } from '~/graphql/helpers'
import { editUser } from '~/graphql/resolvers/mutations/user'
import {
  createBookRecommendation,
  toggleBookRecommendation,
} from '~/graphql/resolvers/mutations/book-recommendations'

export default {
  editUser: requiresUser(editUser),
  createBookRecommendation: requiresUser(createBookRecommendation),
  toggleBookRecommendation: requiresUser(toggleBookRecommendation),
}
