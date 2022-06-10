import { useRouter } from 'next/router'
import { NavigationLink } from '~/components/sidebar/navigation-link'
import {
  BookmarkIcon,
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
          label: 'Home',
          icon: <HomeIcon />,
          isActive: router.asPath === '/',
          isExternal: false,
        },
        {
          href: '/sessions',
          label: 'Sessions',
          icon: <BookmarkIcon />,
          isActive: router.asPath.indexOf('/books') >= 0,
          isExternal: false,
        },
        {
          href: '/meetings',
          label: 'Meetings',
          icon: <PhoneIncomingIcon />,
          isActive: router.asPath.indexOf('/meetings') >= 0,
          isExternal: false,
        },
      ],
    },
  ]

  return (
    <div className="flex-1 px-3 py-3 space-y-1">
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
