import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '~/components/providers'
import { SiteLayout } from '~/components/layouts'
import { ReactElement } from 'react'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactElement) => ReactElement
  }
}) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactElement) => <SiteLayout>{page}</SiteLayout>)

  return (
    <Providers pageProps={pageProps} session={session}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  )
}

export default MyApp
