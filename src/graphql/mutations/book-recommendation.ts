import { gql } from '@apollo/client'

import { UserInfoFragment } from '~/graphql/fragments/user'
import { BookRecommendationInfoFragment } from '~/graphql/fragments/book-recommendation'

export const CREATE_BOOK_RECOMMENDATION = gql`
  mutation createBookRecommendation($data: CreateBookRecommendationInput) {
    createBookRecommendation(data: $data) {
      ...BookInfo
    }
  }
  ${UserInfoFragment}
`

export const TOGGLE_BOOK_RECOMMENDATION = gql`
  mutation toggleBookRecommendation($id: ID!) {
    toggleBookRecommendation(id: $id) {
      ...BookRecommendationInfo
    }
  }
  ${BookRecommendationInfoFragment}
`
