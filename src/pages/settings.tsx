import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import UserSettings from '~/components/user-settings'

const Settings: NextPage = () => {
  return <ListDetailView hasDetail detail={<UserSettings />} />
}

export default Settings
