import { PropsWithChildren } from 'react'

export function SiteLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="relative flex h-full min-h-screen w-full">
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
