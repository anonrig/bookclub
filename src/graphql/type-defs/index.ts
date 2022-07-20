import { gql } from '@apollo/client'

export default gql`
  scalar Date

  type User {
    id: ID!
    name: String
    email: String
    emailVerified: Date
    image: String
    role: Role
  }

  type BookCount {
    recommendations: Int!
  }

  type Book {
    id: ID!
    title: String!
    subtitle: String
    description: String!
    pageCount: Int!
    url: String!
    authors: [String!]!
    thumbnail: String
    publishedAt: Int!
    googleId: String!
    createdAt: Date!
    _count: BookCount!
  }

  type Comment {
    id: ID!
    author: User!
    text: String!
    createdAt: Date!
    updatedAt: Date!
    viewerCanUpdate: Boolean!
    viewerCanDelete: Boolean!
  }

  type BookRecommendations {
    count: Int!
    recommended: Boolean!
  }

  type ReadingSessionMember {
    user: User!
    pageNumber: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type ReadingSession {
    id: ID!
    attending: Boolean!
    book: Book!
    deadlineAt: Date!
    createdAt: Date!
    members: [ReadingSessionMember!]!
    viewer: ReadingSessionMember
  }

  enum Role {
    BLOCKED
    PENDING
    USER
    ADMIN
  }

  enum CommentType {
    BOOK
    READING_SESSION
  }

  enum BookFilterType {
    RECOMMENDATION_COUNT
    RECOMMENDED_AT
    PAGE_COUNT
  }

  input EditUserInput {
    name: String
    email: String
  }

  input GetBooksInput {
    filter: BookFilterType
  }

  type Query {
    bookRecommendations(id: ID!): BookRecommendations
    book(id: ID!): Book
    books(data: GetBooksInput): [Book!]!
    comments(refId: ID!, type: CommentType!): [Comment!]!
    readingSession: ReadingSession
    user(id: ID!): User
    viewer: User
  }

  input CreateReadingSessionInput {
    bookId: ID!
    duration: Int!
  }

  input CreateBookRecommendationInput {
    id: String!
    comment: String
  }

  type Mutation {
    attendReadingSession(id: ID!): Boolean
    createReadingSession(data: CreateReadingSessionInput!): Boolean
    updateReadingSessionPage(pageNumber: Int!): Boolean
    addComment(refId: ID!, type: CommentType!, text: String!): Comment
    updateComment(id: ID!, text: String!): Comment
    removeComment(id: ID!): Boolean
    editUser(data: EditUserInput): User
    createBookRecommendation(data: CreateBookRecommendationInput): Book
    toggleBookRecommendation(id: ID!): BookRecommendations
  }
`
