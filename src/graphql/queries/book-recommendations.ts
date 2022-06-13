import { gql } from '@apollo/client'
import { BookRecommendationInfoFragment } from '~/graphql/fragments/book-recommendation'

export const GET_BOOK_RECOMMENDATIONS = gql`
  query getBookRecommendations($id: ID!) {
    bookRecommendations(id: $id) {
      ...BookRecommendationInfo
    }
  }
  ${BookRecommendationInfoFragment}
`
