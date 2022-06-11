import * as React from 'react'

import Button from '~/components/button'
import { Input } from '~/components/input'
import { LoadingSpinner } from '~/components/loading-spinner'
import { GET_VIEWER_SETTINGS } from '~/graphql/queries/viewer'
import {
  GetViewerWithSettingsQuery,
  useEditUserMutation,
} from '~/graphql/types.generated'
import { useState } from 'react'

export default function NameForm(props: {
  viewer: GetViewerWithSettingsQuery['viewer']
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')

  const [setPendingName, setPendingNameResponse] = useEditUserMutation({
    variables: {
      data: {
        name,
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
            name,
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
      <p className="text-primary font-semibold">Name</p>

      {props.viewer?.name && (
        <div className="text-primary flex space-x-2">
          <span>{props.viewer.name}</span>
          <span>·</span>
          <button
            className="cursor-pointer font-medium text-blue-500"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      )}

      {isEditing && (
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (setPendingNameResponse.loading) return

            if (name === props.viewer?.name) {
              return setIsEditing(false)
            }

            setPendingName()
          }}
        >
          <Input
            type="text"
            placeholder="Update your full name"
            defaultValue={name}
            autoFocus
            onChange={(e) => setName(e.target.value.trim())}
          />
          <div className="flex justify-between">
            <Button type="submit">
              {setPendingNameResponse.loading ? (
                <LoadingSpinner />
              ) : (
                'Save name'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
