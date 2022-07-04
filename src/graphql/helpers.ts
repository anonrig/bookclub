import { AuthenticationError } from 'apollo-server-errors'
import { Context } from '~/graphql/context'
import { Role } from '~/graphql/types.generated'

type Resolve = (parent: never, args: never, context: Context) => void

export function requiresUser(fn: Resolve) {
  return function resolve(parent: never, args: never, context: Context) {
    if (context.viewer?.id) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError('You must be signed in to do that.')
  }
}

export function requiresAdmin(fn: Resolve) {
  return function resolve(parent: never, args: never, context: Context) {
    if (context.viewer?.id && context.viewer?.role === Role.Admin) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError('You must be signed in to do that.')
  }
}
