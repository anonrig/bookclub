import { DefaultSeo } from 'next-seo'
import { defaultSEO } from '~/config/seo'
import Head from 'next/head'

export default function SEO() {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Head>
        <meta
          name="theme-color"
          content="#fff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="rgb(23, 23, 23)"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
    </>
  )
}
