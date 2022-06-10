import { Context } from '~/graphql/context'

export function viewer(_: unknown, __: unknown, { viewer }: Context) {
  return viewer
}
