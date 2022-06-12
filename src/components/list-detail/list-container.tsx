import { forwardRef, PropsWithChildren } from 'react'

export const ListContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<unknown>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className="relative h-full max-h-screen min-h-screen w-full flex-none overflow-y-auto border-r border-gray-150 bg-white dark:border-gray-800 dark:bg-gray-900 lg:w-80 lg:bg-gray-50 lg:dark:bg-gray-900 xl:w-96"
      {...props}
    />
  )
})

ListContainer.displayName = 'ListContainer'
