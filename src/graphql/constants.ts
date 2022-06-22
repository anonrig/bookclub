export const IS_PROD = process.env.NODE_ENV === 'production'
export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_PREVIEW =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'

const PREVIEW_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL

export const GRAPHQL_ENDPOINT = IS_DEV
  ? '/api/graphql'
  : IS_PREVIEW
  ? `https://${PREVIEW_URL}/api/graphql`
  : 'https://nizipli.com/api/graphql'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
