import { AuthenticationError } from 'apollo-server-micro'
import { Context } from '~/graphql/context'

type Resolve = (parent: never, args: never, context: Context) => void

export function requiresUser(fn: Resolve) {
  return function resolve(parent: never, args: never, context: Context) {
    if (context.viewer?.id) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError('You must be signed in to do that.')
  }
}
