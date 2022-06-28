import { ApolloServer } from 'apollo-server-micro'

import typeDefs from '~/graphql/type-defs'
import resolvers from '~/graphql/resolvers'
import context from '~/graphql/context'
import { NextApiHandler } from 'next'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: false,
  cache: 'bounded',
})

const startServer = apolloServer.start()

const handler: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}

export default handler
export const config = { api: { bodyParser: false } }
