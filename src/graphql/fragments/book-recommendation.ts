import { gql } from '@apollo/client'
import { UserInfoFragment } from '~/graphql/fragments/user'

export const BookRecommendationInfoFragment = gql`
  fragment BookRecommendationInfo on BookRecommendations {
    __typename
    count
    recommended
  }
`
