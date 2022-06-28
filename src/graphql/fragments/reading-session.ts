import { gql } from '@apollo/client'
import { UserInfoFragment } from '~/graphql/fragments/user'
import { BookInfoFragment } from '~/graphql/fragments/book'

export const ReadingSessionMemberInfoFragment = gql`
  fragment ReadingSessionMemberInfo on ReadingSessionMember {
    user {
      ...UserInfo
    }
    pageNumber
    createdAt
    updatedAt
  }
  ${UserInfoFragment}
`

export const ReadingSessionInfoFragment = gql`
  fragment ReadingSessionInfo on ReadingSession {
    __typename
    id
    attending
    book {
      ...BookInfo
    }
    deadlineAt
    createdAt
    members {
      ...ReadingSessionMemberInfo
    }
  }
  ${BookInfoFragment}
  ${ReadingSessionMemberInfoFragment}
`
