import { useApolloClient } from '@apollo/client'
import { signOut } from 'next-auth/react'
import Button from '~/components/button'

export default function UserSettingsFooter() {
  const client = useApolloClient()

  return (
    <div className="flex justify-between space-x-4 py-12">
      <Button
        onClick={async () => {
          await signOut()
          await client.resetStore()
        }}
      >
        Log out
      </Button>
    </div>
  )
}
