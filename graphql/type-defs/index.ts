import { gql } from '@apollo/client'

export default gql`
  type User {
    id: ID!
    email: String
  }
`
