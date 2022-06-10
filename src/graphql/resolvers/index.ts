import { dateScalar } from '~/graphql/scalars'
import Query from '~/graphql/resolvers/queries'
import Mutation from '~/graphql/resolvers/mutations'

export default {
  Date: dateScalar,
  Query,
  Mutation,
}
