import { PropsWithChildren } from 'react'
import Sidebar from '~/components/sidebar'

export function SiteLayout({
  children,
  sidebar = true,
}: PropsWithChildren<{
  sidebar?: boolean
}>) {
  return (
    <div className="relative flex h-full min-h-screen w-full">
      {sidebar ? <Sidebar /> : null}
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
