import { PropsWithChildren, ReactElement, ReactNode } from 'react'
import Sidebar from '~/components/sidebar'
import { NextPage } from 'next'

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (children: ReactElement) => ReactNode
}

export function SiteLayout({
  children,
  sidebar = true,
}: PropsWithChildren<{
  sidebar?: boolean
}>) {
  return (
    <div className="relative flex h-full min-h-screen w-full bg-white dark:bg-black">
      {sidebar ? <Sidebar /> : null}
      <div className="flex flex-1">{children}</div>
    </div>
  )
}

export function ListDetailView({
  list,
  detail,
  hasDetail = false,
}: {
  list?: ReactElement | JSX.Element
  detail?: ReactElement | JSX.Element
  hasDetail?: boolean
}) {
  return (
    <div className="flex w-full">
      {list && (
        <div
          id="list"
          className={`bg-dots ${
            hasDetail ? 'hidden lg:flex' : 'min-h-screen w-full'
          }`}
        >
          {list}
        </div>
      )}
      {detail}
    </div>
  )
}
