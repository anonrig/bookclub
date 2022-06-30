import { gql } from '@apollo/client'

export const BookRecommendationInfoFragment = gql`
  fragment BookRecommendationInfo on BookRecommendations {
    __typename
    count
    recommended
  }
`
