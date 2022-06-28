import { gql } from '@apollo/client'

import { ReadingSessionInfoFragment } from '~/graphql/fragments/reading-session'

export const CREATE_READING_SESSION = gql`
  mutation createReadingSession($data: CreateReadingSessionInput!) {
    createReadingSession(data: $data) {
      ...ReadingSessionInfo
    }
  }
  ${ReadingSessionInfoFragment}
`

export const ATTEND_READING_SESSION = gql`
  mutation attendReadingSession($data: AttendReadingSessionInput!) {
    attendReadingSession(data: $data) {
      ...ReadingSessionInfo
    }
  }
  ${ReadingSessionInfoFragment}
`
