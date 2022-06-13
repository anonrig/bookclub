import { gql } from '@apollo/client'

import { UserInfoFragment } from '~/graphql/fragments/user'
import { CommentInfoFragment } from '~/graphql/fragments/comment'

export const ADD_COMMENT = gql`
  mutation addComment($refId: ID!, $type: CommentType!, $text: String!) {
    addComment(refId: $refId, type: $type, text: $text) {
      ...CommentInfo
    }
  }
  ${CommentInfoFragment}
`

export const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $text: String!) {
    updateComment(id: $id, text: $text) {
      ...CommentInfo
    }
  }
  ${CommentInfoFragment}
`

export const REMOVE_COMMENT = gql`
  mutation removeComment($id: ID!) {
    removeComment(id: $id)
  }
`
