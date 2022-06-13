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

  type Comment {
    id: ID!
    author: User!
    text: String!
    createdAt: Date!
    updatedAt: Date!
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

  enum CommentType {
    BOOK
  }

  input EditUserInput {
    name: String
    email: String
  }

  input GetCommentsInput {
    refId: ID!
    type: CommentType!
  }

  type Query {
    bookRecommendations(id: ID!): BookRecommendations
    book(id: ID!): Book
    books: [Book!]!
    comments(refId: ID!, type: CommentType!): [Comment!]!
    viewer: User
  }

  input CreateBookRecommendationInput {
    id: String!
    comment: String
  }

  type Mutation {
    addComment(refId: ID!, type: CommentType!, text: String!): Comment
    updateComment(id: ID!, text: String!): Comment
    removeComment(id: ID!): Boolean
    editUser(data: EditUserInput): User
    createBookRecommendation(data: CreateBookRecommendationInput): Book
    toggleBookRecommendation(id: ID!): BookRecommendations
  }
`
