import { PropsWithChildren } from 'react'
import Sidebar from '~/components/sidebar'

export function SiteLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="relative flex h-full min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
