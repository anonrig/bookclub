import { gql } from '@apollo/client'

import {
  UserInfoFragment,
  UserSettingsFragment,
} from '~/graphql/fragments/user'

export const GET_VIEWER = gql`
  query viewer {
    viewer {
      ...UserInfo
    }
  }
  ${UserInfoFragment}
`

export const GET_VIEWER_SETTINGS = gql`
  query getViewerWithSettings {
    viewer {
      ...UserInfo
      ...UserSettings
    }
  }
  ${UserInfoFragment}
  ${UserSettingsFragment}
`
