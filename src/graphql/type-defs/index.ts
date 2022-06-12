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

  type Book {
    id: ID!
    title: String!
    subtitle: String!
    description: String!
    pageCount: Int!
    url: String!
    authors: [String!]!
    thumbnail: String
    publishedAt: Int!
    googleId: String!
    createdAt: Date!

    recommendedBy: User!
  }

  enum Role {
    BLOCKED
    PENDING
    USER
    ADMIN
  }

  input EditUserInput {
    name: String
    email: String
  }

  input CreateBookRecommendationInput {
    id: String!
    comment: String
  }

  type Query {
    book(id: ID!): Book
    books: [Book!]!
    viewer: User
  }

  type Mutation {
    editUser(data: EditUserInput): User
    createBookRecommendation(data: CreateBookRecommendationInput): Book
  }
`
