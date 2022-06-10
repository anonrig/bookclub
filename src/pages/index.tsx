import type { NextPage } from 'next'
import { SiteLayout } from '~/components/layouts'

const Home: NextPage = () => {
  return (
    <SiteLayout>
      <div className="items-center justify-center flex w-full flex-col">
        <div className="space-y-6"></div>
      </div>
    </SiteLayout>
  )
}

export default Home
