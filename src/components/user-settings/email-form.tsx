import * as React from 'react'

import Button from '~/components/button'
import { Input } from '~/components/input'
import { LoadingSpinner } from '~/components/loading-spinner'
import { GET_VIEWER_SETTINGS } from '~/graphql/queries/viewer'
import {
  GetViewerWithSettingsQuery,
  useEditUserMutation,
} from '~/graphql/types.generated'

export default function EmailForm(props: {
  viewer: GetViewerWithSettingsQuery['viewer']
}) {
  const isNew = !props.viewer?.email && !props.viewer?.emailVerified

  const [isEditing, setIsEditing] = React.useState(isNew)
  const [email, setEmail] = React.useState('')

  const [setPendingEmail, setPendingEmailResponse] = useEditUserMutation({
    variables: {
      data: {
        email,
      },
    },
    update(cache) {
      const { viewer } = cache.readQuery<any>({
        query: GET_VIEWER_SETTINGS,
      })

      cache.writeQuery({
        query: GET_VIEWER_SETTINGS,
        data: {
          viewer: {
            ...viewer,
            email: email === viewer.email ? null : email,
          },
        },
      })
    },
    onError() {},
    onCompleted() {
      setIsEditing(false)
    },
  })

  return (
    <div className="space-y-2">
      <p className="text-primary font-semibold">Email</p>

      {props.viewer?.email && (
        <div className="text-primary flex space-x-2">
          <span>{props.viewer.email}</span>
          <span>·</span>
          <button
            className="cursor-pointer font-medium text-blue-500"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      )}

      {(isNew || isEditing) && (
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (setPendingEmailResponse.loading) return

            if (email === props.viewer?.email) {
              return setIsEditing(false)
            }

            setPendingEmail()
          }}
        >
          <Input
            type="email"
            placeholder={
              isNew ? 'Add your email address' : 'Update your email address'
            }
            defaultValue={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <div className="flex justify-between">
            <Button type="submit">
              {setPendingEmailResponse.loading ? (
                <LoadingSpinner />
              ) : (
                'Save email'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
