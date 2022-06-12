import { gql } from '@apollo/client'

import { UserInfoFragment } from '~/graphql/fragments/user'

export const CREATE_BOOK_RECOMMENDATION = gql`
  mutation createBookRecommendation($data: CreateBookRecommendationInput) {
    createBookRecommendation(data: $data) {
      ...BookInfo
    }
  }
  ${UserInfoFragment}
`
