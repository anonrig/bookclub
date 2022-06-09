import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '~/components/providers'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Providers pageProps={pageProps} session={session}>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
