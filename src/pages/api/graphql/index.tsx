import { schema } from '~/graphql/schema'
import { getContext } from '~/graphql/context'
import { createGraphQLHandler } from '~/lib/graphql'

export default createGraphQLHandler({
  schema,
  context: (req, res) => getContext(req, res),
})

export const config = {
  api: { externalResolver: true },
}
