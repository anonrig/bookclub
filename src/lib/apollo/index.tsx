import {
  ApolloClient,
  ApolloLink,
  Context,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ServerError,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import merge from 'deepmerge'
import isEqual from 'lodash.isequal'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { APOLLO_STATE_PROP_NAME, GRAPHQL_ENDPOINT } from '~/graphql/constants'
import { AppProps } from 'next/app'
import { schema } from '~/graphql/schema'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createIsomorphLink({ context }: { context: Context }) {
  if (typeof window === 'undefined') {
    // These have to imported dynamically, instead of at the root of the page,
    // in order to make sure that we're not shipping server-side code to the client
    // eslint-disable-next-line
    const { SchemaLink } = require('@apollo/client/link/schema')
    // eslint-disable-next-line
    return new SchemaLink({ schema, context })
  } else {
    return new HttpLink({
      uri: GRAPHQL_ENDPOINT || '/api/graphql',
      credentials: 'include',
    })
  }
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      try {
        toast.error(message)
      } catch {
        console.error({ message })
      }
    })
  }

  if (networkError) {
    const err = networkError as ServerError
    try {
      toast.error(err.result.error)
    } catch {
      console.error({ err })
    }
  }
})

export function createApolloClient({ initialState = {}, context = {} }) {
  const link = ApolloLink.from([errorLink, createIsomorphLink({ context })])
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(initialState)

  return new ApolloClient({
    ssrMode,
    link,
    cache,
    ssrForceFetchDelay: 1000,
  })
}

export function initApolloClient({ initialState = undefined, context = {} }) {
  const _apolloClient =
    apolloClient ?? createApolloClient({ initialState, context })

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: unknown[], sourceArray: unknown[]) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<unknown>,
  pageProps: AppProps['pageProps'] | undefined
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const initialState = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(
    () => initApolloClient({ initialState }),
    [initialState]
  )
  return store
}
