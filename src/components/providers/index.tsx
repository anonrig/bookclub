import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '~/lib/apollo'
import { NextPageContext } from 'next'
import { Session } from 'next-auth'

export default function Providers({
  children,
  pageProps,
  session,
}: PropsWithChildren<{
  pageProps: NextPageContext
  session: Session
}>) {
  const client = useApollo(pageProps)

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ApolloProvider>
  )
}
