import Link from 'next/link'
import * as React from 'react'
import { CogIcon } from '@heroicons/react/outline'
import { GhostButton } from '~/components/button'
import { PropsWithChildren } from 'react'
import { Avatar } from '~/components/avatar'
import { LoadingSpinner } from '~/components/loading-spinner'
import { useViewerQuery } from '~/graphql/types.generated'

function Container(props: PropsWithChildren<unknown>) {
  return (
    <div
      data-cy="sign-in-button"
      className="filter-blur sticky bottom-0 z-10 flex items-center justify-between space-x-3 border-t border-gray-150 bg-white bg-opacity-80 p-2 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-60"
      {...props}
    />
  )
}

export function UserFooter() {
  const { data, loading, error } = useViewerQuery()

  if (loading || error || !data) {
    return (
      <Container>
        <div className="flex w-full items-center justify-center py-1">
          <LoadingSpinner />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Link href={`/u/${data.viewer?.id ?? ''}`}>
        <a className="flex flex-none items-center rounded-full">
          <Avatar
            user={{
              name: data.viewer?.name ?? '',
              username: data.viewer?.name ?? '',
            }}
            src={data.viewer?.image ?? ''}
            width={24}
            height={24}
            layout="fixed"
            className="rounded-full"
          />
        </a>
      </Link>
      <GhostButton
        aria-label="Manage settings"
        size="small-square"
        href="/settings"
      >
        <CogIcon className="w-4 h-4" />
      </GhostButton>
    </Container>
  )
}
