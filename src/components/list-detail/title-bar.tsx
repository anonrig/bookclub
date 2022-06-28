import Link from 'next/link'
import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ArrowLeftIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { GlobalNavigationContext } from '~/components/providers'

type Props = {
  title: string
  globalMenu?: boolean
  backButton?: boolean
  backButtonHref?: string
  magicTitle?: boolean
  titleRef?: MutableRefObject<HTMLParagraphElement | null>
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>
  children?: ReactNode
  leadingAccessory?: ReactNode
  trailingAccessory?: ReactNode
}

export function TitleBar({
  title,
  globalMenu = true,
  backButton = false,
  backButtonHref,
  magicTitle = false,
  titleRef,
  scrollContainerRef,
  leadingAccessory = null,
  trailingAccessory = null,
  children,
}: Props) {
  const { isOpen, setIsOpen } = useContext(GlobalNavigationContext)
  const [darkMode, setDarkMode] = useState(false)
  const [offset, setOffset] = useState(200)
  const [opacity, _setOpacity] = useState(0)
  const [currentScrollOffset, _setCurrentScrollOffset] = useState(0)
  const [initialTitleOffsets, _setInitialTitleOffsets] = useState({
    top: 0,
    bottom: 0,
  })

  const initialTitleOffsetsRef = useRef(initialTitleOffsets)
  const setInitialTitleOffsets = (data: { top: number; bottom: number }) => {
    initialTitleOffsetsRef.current = data
    _setInitialTitleOffsets(data)
  }

  const opacityRef = useRef(opacity)
  const setOpacity = (data: number) => {
    opacityRef.current = data
    _setOpacity(data)
  }

  const currentScrollOffsetRef = useRef(currentScrollOffset)
  const setCurrentScrollOffset = (data: number) => {
    currentScrollOffsetRef.current = data
    _setCurrentScrollOffset(data)
  }

  const handler = useCallback(() => {
    const shadowOpacity = scrollContainerRef?.current?.scrollTop ?? 0 / 200
    setCurrentScrollOffset(shadowOpacity > 0.12 ? 0.12 : shadowOpacity)

    if (!titleRef?.current || !initialTitleOffsetsRef?.current) return

    const titleTop = titleRef.current.getBoundingClientRect().top - 48
    const titleBottom = titleRef.current.getBoundingClientRect().bottom - 56
    const initialOffsets = initialTitleOffsetsRef.current

    let offsetAmount =
      parseFloat((titleBottom / initialOffsets.bottom).toFixed(2)) * 100

    let opacityOffset =
      parseFloat((titleTop / initialOffsets.top).toFixed(2)) * -1

    setOffset(Math.min(Math.max(offsetAmount, 0), 100))
    setOpacity(opacityOffset)
  }, [titleRef, scrollContainerRef])

  useEffect(() => {
    const reference = scrollContainerRef?.current
    reference?.addEventListener('scroll', handler)
    return () => reference?.removeEventListener('scroll', handler)
  }, [title, titleRef, scrollContainerRef, handler])

  useEffect(() => {
    if (!titleRef?.current || !scrollContainerRef?.current) return
    scrollContainerRef.current.scrollTop = 0
    setOpacity(0)
    setInitialTitleOffsets({
      bottom: titleRef.current.getBoundingClientRect().bottom - 56,
      top: titleRef.current.getBoundingClientRect().top - 48,
    })
  }, [title, titleRef, scrollContainerRef])

  useEffect(() => {
    const isDarkMode =
      window?.matchMedia &&
      window?.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDarkMode) setDarkMode(true)
  }, [])

  return (
    <>
      <div
        style={{
          background: `rgba(${darkMode ? '50,50,50' : '255,255,255'},${
            currentScrollOffset === 0
              ? currentScrollOffset
              : darkMode
              ? currentScrollOffset + 0.5
              : currentScrollOffset + 0.8
          })`,
          boxShadow: `0 1px 3px rgba(0,0,0,${currentScrollOffset})`,
          minHeight: '48px',
        }}
        className={`filter-blur sticky top-0 z-10 flex flex-col justify-center px-3 py-2 dark:border-b dark:border-gray-900`}
      >
        <div className="flex flex-none items-center justify-between">
          <span className="flex items-center space-x-3">
            {globalMenu && (
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800 lg:hidden"
              >
                {isOpen ? (
                  <XIcon className="text-primary h-4 w-4" />
                ) : (
                  <MenuIcon className="text-primary h-4 w-4" />
                )}
              </span>
            )}

            {backButton && backButtonHref && (
              <Link href={backButtonHref}>
                <a className="text-primary flex items-center justify-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800 lg:hidden">
                  <ArrowLeftIcon className="text-primary h-4 w-4" />
                </a>
              </Link>
            )}

            {leadingAccessory && <>{leadingAccessory}</>}

            <h2
              style={
                magicTitle
                  ? {
                      transform: `translateY(${offset}%)`,
                      opacity: `${opacity}`,
                    }
                  : {}
              }
              className="text-primary transform-gpu text-sm font-bold line-clamp-1"
            >
              {title}
            </h2>
          </span>

          {trailingAccessory && <>{trailingAccessory}</>}
        </div>

        <div>{children}</div>
      </div>
    </>
  )
}
