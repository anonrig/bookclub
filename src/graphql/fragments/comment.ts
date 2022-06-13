import { gql } from '@apollo/client'
import { UserInfoFragment } from '~/graphql/fragments/user'
import { BookInfoFragment } from '~/graphql/fragments/book'

export const CommentInfoFragment = gql`
  fragment CommentInfo on Comment {
    __typename
    id
    text
    author {
      ...UserInfo
    }
  }
  ${UserInfoFragment}
`
