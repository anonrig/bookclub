import { schema } from '~/graphql/schema'
import { getContext } from '~/graphql/context'
import { createGraphQLHandler } from '~/lib/graphql'

export default createGraphQLHandler({
  schema,
  context: (req) => getContext(req),
})

export const config = {
  api: { externalResolver: true },
}
