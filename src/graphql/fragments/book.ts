import { gql } from '@apollo/client'
import { UserInfoFragment } from '~/graphql/fragments/user'

export const BookInfoFragment = gql`
  fragment BookInfo on Book {
    __typename
    id
    title
    thumbnail
    authors
  }
`

export const BookInfoDetailFragment = gql`
  fragment BookInfoDetail on Book {
    ...BookInfo
    subtitle
    description
    url
    googleId
    publishedAt
    pageCount
    createdAt
  }
  ${BookInfoFragment}
  ${UserInfoFragment}
`
