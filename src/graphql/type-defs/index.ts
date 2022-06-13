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
  }

  type BookComment {
    user: User!
    bookId: ID!
    comment: String!
    createdAt: Date!
  }

  type BookRecommendations {
    count: Int!
    recommended: Boolean!
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

  type Query {
    bookRecommendations(id: ID!): BookRecommendations
    book(id: ID!): Book
    books: [Book!]!
    viewer: User
  }

  input CreateBookRecommendationInput {
    id: String!
    comment: String
  }

  type Mutation {
    toggleBookRecommendation(id: ID!): BookRecommendations
    editUser(data: EditUserInput): User
    createBookRecommendation(data: CreateBookRecommendationInput): Book
  }
`
