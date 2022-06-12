import { createContext, PropsWithChildren, useMemo, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '~/lib/apollo'
import { NextPageContext } from 'next'
import { Session } from 'next-auth'
import { Toast } from '~/components/providers/toast'

const globalNavigationContext = {
  isOpen: false,
  setIsOpen: (value: boolean) => {},
}

export const GlobalNavigationContext = createContext(globalNavigationContext)

export default function Providers({
  children,
  pageProps,
  session,
}: PropsWithChildren<{
  pageProps: NextPageContext
  session: Session
}>) {
  const client = useApollo(pageProps)
  const [isOpen, setIsOpen] = useState(false)
  const state = useMemo(() => ({ isOpen, setIsOpen }), [isOpen])

  return (
    <>
      <Toast />
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <GlobalNavigationContext.Provider value={state}>
            {children}
          </GlobalNavigationContext.Provider>
        </SessionProvider>
      </ApolloProvider>
    </>
  )
}