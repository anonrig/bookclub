import { ApolloServer } from 'apollo-server-micro'
import { withSentry } from '@sentry/nextjs'

import context from '~/graphql/context'
import { schema } from '~/graphql/schema'
import { NextApiHandler } from 'next'

const apolloServer = new ApolloServer({
  schema,
  context,
})

let apolloHandler: NextApiHandler

async function getApolloServerHandler() {
  if (!apolloHandler) {
    await apolloServer.start()

    apolloHandler = apolloServer.createHandler({
      path: '/api/graphql',
    })
  }

  return apolloHandler
}

const handler: NextApiHandler = async (req, res) => {
  const apolloHandler = await getApolloServerHandler()

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  return apolloHandler(req, res)
}

export default withSentry(handler)
export const config = { api: { bodyParser: false } }
