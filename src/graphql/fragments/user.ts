import { gql } from '@apollo/client'

export const UserInfoFragment = gql`
  fragment UserInfo on User {
    __typename
    id
    name
    image
    role
  }
`

export const UserSettingsFragment = gql`
  fragment UserSettings on User {
    email
    emailVerified
  }
`
