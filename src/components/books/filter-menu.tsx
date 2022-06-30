import { GhostButton } from '~/components/button'
import { CheckIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext, useMemo } from 'react'
import { BookContext } from '~/components/books/book-list'
import { BookFilterType } from '~/graphql/types.generated'

function getTitle(filter: BookFilterType) {
  switch (filter) {
    case BookFilterType.PageCount:
      return 'Page number'
    case BookFilterType.RecommendationCount:
      return 'Endorsement count'
    case BookFilterType.RecommendedAt:
      return 'Recently added'
  }
}

export default function BookFilterMenu() {
  const { filter, setFilter } = useContext(BookContext)
  const filters = useMemo(
    () => [
      BookFilterType.RecommendationCount,
      BookFilterType.RecommendedAt,
      BookFilterType.PageCount,
    ],
    []
  )

  return (
    <div className="flex items-center justify-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex flex-none cursor-pointer items-center justify-center space-x-2 rounded-md bg-gray-200 bg-opacity-0 p-2 text-sm font-semibold leading-none text-gray-700 transition-all hover:bg-opacity-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:text-gray-500/50 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white ">
            {filter && (
              <div className="absolute top-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-blue-500 dark:border-gray-900" />
            )}
            <DotsHorizontalIcon className="h-4 w-4" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-sm outline-none dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col space-y-2 py-2">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => setFilter(null)}
                    className={`${
                      active
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-900 dark:text-gray-200'
                    } text-secondary flex w-full cursor-pointer items-center justify-between space-x-2 py-2 px-4 text-sm`}
                  >
                    All books
                    {filter === null ? <CheckIcon className="h-4 w-4" /> : null}
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="flex flex-col py-2">
              {filters.map((f) => (
                <Menu.Item key={getTitle(f)}>
                  {({ active }) => (
                    <a
                      onClick={() => setFilter(f)}
                      className={`${
                        active
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-900 dark:text-gray-200'
                      } text-secondary flex w-full cursor-pointer items-center justify-between space-x-2 py-2 px-4 text-sm`}
                    >
                      {getTitle(f)}
                      {f === filter ? <CheckIcon className="h-4 w-4" /> : null}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
