import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import { GraphQLSchema } from 'graphql'

import { getGraphQLParameters, processRequest, sendResult } from 'graphql-helix'
import {
  envelop,
  useImmediateIntrospection as ImmediateIntrospection,
  useLogger as Logger,
  useSchema as Schema,
  useTiming as Timing,
} from '@envelop/core'

type Options = {
  useLogger?: boolean
  useTiming?: boolean
  useImmediateIntrospection?: boolean
}

export const createGraphQLHandler = (
  {
    schema,
    context,
  }: {
    schema: GraphQLSchema
    context: (
      req: GetServerSidePropsContext['req'],
      res: GetServerSidePropsContext['res']
    ) => unknown | Promise<unknown>
  },
  { useLogger, useImmediateIntrospection, useTiming }: Options = {}
) => {
  const plugins = [
    Schema(schema),
    ...(useLogger ? [Logger()] : []),
    ...(useTiming ? [Timing()] : []),
    ...(useImmediateIntrospection ? [ImmediateIntrospection()] : []),
  ]

  const getEnveloped = envelop({ plugins })

  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      res.writeHead(200, {
        'content-type': 'text/html',
      })
      res.end()
    } else {
      const enveloped = getEnveloped({ req })

      const { body, headers, method = 'GET', query } = req
      const request = { body, headers, method, query }
      const params = getGraphQLParameters(request)
      const result = await processRequest({
        request,
        ...enveloped,
        ...params,
        contextFactory: () => {
          return context(req, res)
        },
      })

      return sendResult(result, res)
    }
  }
}
