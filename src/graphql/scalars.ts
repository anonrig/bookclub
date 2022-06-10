import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export const dateScalar = new GraphQLScalarType<string, Date>({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value: any) {
    return new Date(value) as any // value from the client
  },
  serialize(value: any) {
    return value.getTime() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10) as any
    }
    return null
  },
})
