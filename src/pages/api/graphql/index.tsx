import { ApolloServer } from 'apollo-server-micro'

import typeDefs from '~/graphql/type-defs'
import resolvers from '~/graphql/resolvers'
import context from '~/graphql/context'
import { NextApiHandler } from 'next'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
})

const startServer = apolloServer.start()

export const config = { api: { bodyParser: false } }

const handler: NextApiHandler = async (req, res) => {
  await startServer
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}
export default handler
