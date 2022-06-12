import useGoogleSearch from '~/hooks/use-google-search'
import { Combobox, Transition } from '@headlessui/react'
import { GoogleBook } from '~/lib/google-books'
import BookSearchRow from '~/components/book-recommend/search-row'
import { useEffect, useState } from 'react'
import { Tooltip } from '~/components/tooltip'
import Button from '~/components/button'

type Props = {
  onBookChange: (book: GoogleBook | null) => void
}

export default function BookSearch({ onBookChange }: Props) {
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null)
  const { search, results } = useGoogleSearch()

  useEffect(() => {
    onBookChange(selectedBook)
  }, [onBookChange, selectedBook])

  if (selectedBook) {
    return (
      <div className="space-y-2">
        <p className="text-primary font-semibold">Book name</p>
        <div className="text-primary flex space-x-2">
          <span>{selectedBook.title}</span>
          <span>·</span>
          <button
            className="cursor-pointer font-medium text-blue-500"
            onClick={() => setSelectedBook(null)}
          >
            Cancel
          </button>
        </div>
        <p className="text-quaternary text-sm">
          It would take an average person{' '}
          <Tooltip content="Average person reads 20 to 30 pages per day.">
            <span className="underline">
              {Math.floor(selectedBook.pageCount / 25)} days
            </span>
          </Tooltip>{' '}
          to read this book.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-primary font-semibold">Book name</p>

      <Combobox value={selectedBook} onChange={setSelectedBook} as="div">
        {({ open }) => (
          <>
            <Combobox.Input
              onChange={(event) => search(event.target.value)}
              className="w-full rounded-md text-primary px-4 py-2 text-primary dark:bg-white dark:bg-opacity-5 bg-opacity-5 hover border-gray-200 dark:border-gray-700"
              placeholder="Hail Mary"
              autoFocus
              displayValue={(book: GoogleBook) => book?.title ?? ''}
            />
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Combobox.Options className="absolute z-10 absolute w-full bg-white dark:bg-gray-900 shadow-lg max-h-60 overflow-scroll rounded-md space-y-2">
                {results.map((book) => (
                  <Combobox.Option key={book.id} value={book}>
                    {({ active, selected }) => (
                      <BookSearchRow
                        book={book}
                        active={active}
                        selected={selected}
                      />
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
    </div>
  )
}
