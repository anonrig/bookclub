import { gql } from '@apollo/client'
import { UserInfoFragment } from '~/graphql/fragments/user'

export const CommentInfoFragment = gql`
  fragment CommentInfo on Comment {
    __typename
    id
    text
    author {
      ...UserInfo
    }
    viewerCanUpdate
    viewerCanDelete
  }
  ${UserInfoFragment}
`
