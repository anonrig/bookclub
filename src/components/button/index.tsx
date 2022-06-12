import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

interface BaseButtonProps {
  [key: string]: unknown
  size: 'large' | 'small' | 'small-square' | null
  disabled?: boolean
}

type ButtonAsButton = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

type ButtonAsLink = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonProps = ButtonAsButton | ButtonAsLink

function BaseButton({
  href,
  as,
  forwardedRef,
  ...rest
}: {
  href?: string
  as?: string
  forwardedRef: any
}) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} as={as}>
        <a {...rest} />
      </Link>
    )
  }

  if (href) {
    return <a ref={forwardedRef} href={href} {...rest} />
  }

  return <button ref={forwardedRef} {...rest} />
}

function getSize(size: BaseButtonProps['size']) {
  switch (size) {
    case 'large': {
      return 'px-4 py-3 text-sm'
    }
    case 'small': {
      return 'px-2.5 py-1.5 text-xs'
    }
    case 'small-square': {
      return 'p-2 text-sm'
    }
    default: {
      return 'px-4 py-2 text-sm'
    }
  }
}

function getOpacity(disabled = false) {
  return disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
}

function getRadius(size: BaseButtonProps['size']) {
  switch (size) {
    case 'large': {
      return 'rounded-lg'
    }
    case 'small': {
      return 'rounded'
    }
    default: {
      return 'rounded-md'
    }
  }
}

const baseClasses =
  'flex space-x-2 flex-none items-center justify-center cursor-pointer leading-none transition-all font-semibold'

export const Button = forwardRef((props: ButtonProps, ref) => {
  const classes = `text-gray-700 hover:text-gray-900 shadow-xs bg-white border border-gray-400 border-opacity-30 dark:border-gray-700 dark:hover:border-gray-600 dark:bg-white dark:bg-opacity-10 dark:text-gray-200 dark:hover:text-white hover:border-opacity-50 hover:shadow-sm`
  const size = getSize(props.size)
  const opacity = getOpacity(props.disabled)
  const radius = getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
  return <BaseButton forwardedRef={ref} className={composed} {...props} />
})
Button.displayName = 'Button'

export const GhostButton = forwardRef((props: ButtonProps, ref) => {
  const classes = `text-gray-700 hover:text-gray-900 bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white`
  const size = getSize(props.size)
  const opacity = getOpacity(props.disabled)
  const radius = getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
  return <BaseButton forwardedRef={ref} className={composed} {...props} />
})
GhostButton.displayName = 'GhostButton'

export const DeleteButton = forwardRef((props: ButtonProps, ref) => {
  const classes = `bg-white border border-gray-200 dark:border-red-500 dark:hover:border-red-500  dark:bg-red-500 dark:border-opacity-20 dark:bg-opacity-10 text-red-500 hover:border-red-500 hover:text-white hover:bg-red-600 focus:bg-red-600 dark:focus:text-white`
  const size = getSize(props.size)
  const opacity = getOpacity(props.disabled)
  const radius = getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
  return <BaseButton forwardedRef={ref} className={composed} {...props} />
})
DeleteButton.displayName = 'DeleteButton'

export default Button
