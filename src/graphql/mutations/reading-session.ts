import { gql } from '@apollo/client'

export const CREATE_READING_SESSION = gql`
  mutation createReadingSession($data: CreateReadingSessionInput!) {
    createReadingSession(data: $data)
  }
`

export const ATTEND_READING_SESSION = gql`
  mutation attendReadingSession($id: ID!) {
    attendReadingSession(id: $id)
  }
`

export const UPDATE_READING_SESSION_PAGE = gql`
  mutation updateReadingSessionPage($pageNumber: Int!) {
    updateReadingSessionPage(pageNumber: $pageNumber)
  }
`
