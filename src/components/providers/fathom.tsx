import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FATHOM_CUSTOM_URL, FATHOM_SITE_ID } from '~/config/environment'

export function FathomProvider() {
  const router = useRouter()

  useEffect(() => {
    Fathom.load(FATHOM_SITE_ID, {
      includedDomains: ['nizipli.com'],
      excludedDomains: ['vercel.app,localhost'],
      url: FATHOM_CUSTOM_URL,
      spa: 'auto',
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return null
}
