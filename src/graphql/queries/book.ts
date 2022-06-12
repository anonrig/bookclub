import { gql } from '@apollo/client'
import {
  BookInfoDetailFragment,
  BookInfoFragment,
} from '~/graphql/fragments/book'

export const GET_BOOKS = gql`
  query getBooks {
    books {
      ...BookInfo
    }
  }
  ${BookInfoFragment}
`

export const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      ...BookInfo
      ...BookInfoDetail
    }
  }
  ${BookInfoFragment}
  ${BookInfoDetailFragment}
`
