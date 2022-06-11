import { gql } from 'apollo-server-micro'

export default gql`
  scalar Date

  type User {
    id: ID!
    name: String
    email: String!
    emailVerified: Date
    image: String
    role: Role
  }

  enum Role {
    BLOCKED
    USER
    ADMIN
  }

  input EditUserInput {
    name: String
    email: String
  }

  type Query {
    viewer: User
  }

  type Mutation {
    editUser(data: EditUserInput): User
  }
`
