import Link from 'next/link'
import { useContext } from 'react'
import { GlobalNavigationContext } from '~/components/providers'

export type Link = {
  href: string
  label: string
  icon: JSX.Element
  isActive: boolean
  isExternal: boolean
}

type Props = {
  link: Link
}

export function NavigationLink({
  link: { href, label, icon, isActive, isExternal },
}: Props) {
  const { setIsOpen } = useContext(GlobalNavigationContext)

  return (
    <li
      className="flex items-stretch space-x-1"
      onClick={() => setIsOpen(false)}
    >
      <Link href={href}>
        <a
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={`flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium  ${
            isActive
              ? 'bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
              : 'text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200'
          }`}
        >
          <span className="flex h-4 w-4 items-center justify-center">
            {icon}
          </span>
          <span className="flex-1">{label}</span>
        </a>
      </Link>
    </li>
  )
}
