import { useRouter } from 'next/router'
import { NavigationLink } from '~/components/sidebar/navigation-link'
import {
  BookmarkIcon,
  BookOpenIcon,
  HomeIcon,
  PhoneIncomingIcon,
} from '@heroicons/react/outline'

export default function Navigation() {
  const router = useRouter()
  const sections = [
    {
      id: 'home',
      label: null,
      items: [
        {
          href: '/',
          label: 'Session',
          icon: <BookmarkIcon className="h-4 w-4" />,
          isActive: router.asPath === '/',
          isExternal: false,
        },
        {
          href: '/books',
          label: 'Books',
          icon: <BookOpenIcon className="h-4 w-4" />,
          isActive: router.asPath.indexOf('/books') >= 0,
          isExternal: false,
        },
        {
          href: '/meetings',
          label: 'Meetings',
          icon: <PhoneIncomingIcon className="h-4 w-4" />,
          isActive: router.asPath.indexOf('/meetings') >= 0,
          isExternal: false,
        },
      ],
    },
  ]

  return (
    <div className="flex-1 space-y-1 px-3 py-3">
      {sections.map((section) => {
        return (
          <ul key={section.id} className="space-y-1">
            {section.label && (
              <h4
                key={section.label}
                className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white"
              >
                {section.label}
              </h4>
            )}
            {section.items.map((item, j) => (
              <NavigationLink key={j} link={item} />
            ))}
          </ul>
        )
      })}
    </div>
  )
}
