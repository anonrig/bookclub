import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactElement, useRef, useState } from 'react'

import { GhostButton } from '~/components/button'
import { XIcon } from '@heroicons/react/outline'

type Props = {
  children?: (props: {
    closeModal: VoidFunction
    openModal: VoidFunction
  }) => void
  trigger?: ReactElement
  title: string
  modalContent: (props: {
    closeModal: VoidFunction
    openModal: VoidFunction
  }) => ReactElement
}

export function DialogComponent({
  trigger,
  children,
  title,
  modalContent,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      {trigger && <div onClick={openModal}>{trigger}</div>}

      {children && children({ closeModal, openModal })}

      <Transition.Root appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
          initialFocus={closeButtonRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="fixed bottom-0 left-0 max-h-screen w-full transform-gpu overflow-y-auto rounded-t-xl border border-gray-200 bg-white pb-10 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-2xl sm:bottom-auto sm:top-1/4 sm:left-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:rounded-xl sm:pb-0 md:max-w-md lg:max-w-lg">
                  <div className="flex flex-col">
                    <div className="sticky top-0 flex w-full items-center justify-between border-b border-gray-150 bg-white py-2 pl-4 pr-2 dark:border-gray-700 dark:bg-gray-800">
                      <Dialog.Title
                        as="h3"
                        className="text-primary text-left text-sm font-semibold"
                      >
                        {title}
                      </Dialog.Title>
                      <GhostButton
                        aria-label="Close dialog"
                        size="small-square"
                        ref={closeButtonRef}
                        onClick={closeModal}
                      >
                        <XIcon className="h-4 w-4" />
                      </GhostButton>
                    </div>

                    <div className="overflow-y-auto">
                      {modalContent({ closeModal, openModal })}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
