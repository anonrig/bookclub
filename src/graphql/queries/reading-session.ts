import { gql } from '@apollo/client'

import { ReadingSessionInfoFragment } from '~/graphql/fragments/reading-session'

export const GET_READING_SESSION = gql`
  query readingSession {
    readingSession {
      ...ReadingSessionInfo
    }
  }
  ${ReadingSessionInfoFragment}
`
