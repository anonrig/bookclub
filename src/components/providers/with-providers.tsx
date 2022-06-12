import Providers from '~/components/providers'
import { PropsWithChildren, ReactElement } from 'react'
import { NextPageContext } from 'next'
import { Session } from 'next-auth'

type WithProviderInput = PropsWithChildren<{
  props: NextPageContext
  session: Session
}>

export function withProviders(
  fn: (element: WithProviderInput) => ReactElement
) {
  return function withPage(page: WithProviderInput) {
    return (
      <Providers pageProps={page.props} session={page.session}>
        {fn(page)}
      </Providers>
    )
  }
}
