import { requiresUser } from '~/graphql/helpers'
import { editUser } from '~/graphql/resolvers/mutations/user'

export default {
  editUser: requiresUser(editUser),
}
