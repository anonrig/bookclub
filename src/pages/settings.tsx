import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import UserSettings from '~/components/user-settings'
import { NextSeo } from 'next-seo'

const Settings: NextPage = () => {
  return (
    <>
      <NextSeo title="User Settings" />
      <ListDetailView hasDetail detail={<UserSettings />} />
    </>
  )
}

export default Settings
