import Button from '~/components/button'
import { useEffect, useMemo, useRef, useState } from 'react'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'

type Props = {
  hasReacted: boolean
  count: number
  onClick: () => void
  loading: boolean
}

export function ReactionButton(props: Props) {
  const { onClick, hasReacted, count, loading } = props

  const [hasReactedState, setHasReactedState] = useState(hasReacted)
  const nextCount = useMemo(
    () => (hasReacted ? count - 1 : count + 1),
    [hasReacted, count]
  )
  const [currTranslate, setCurrTranslate] = useState(
    hasReactedState ? '-translate-y-4' : 'translate-y-0'
  )
  const [nextTranslate, setNextTranslate] = useState(
    hasReactedState ? 'translate-y-0' : '-translate-y-4'
  )
  const currOpacity = 'opacity-100'
  const nextOpacity = 'opacity-0'

  // reset all the states as people navigate between different reactable pages
  useEffect(() => {
    setHasReactedState(hasReacted)
    setCurrTranslate(hasReacted ? '-translate-y-4' : 'translate-y-0')
    setNextTranslate(hasReacted ? 'translate-y-0' : '-translate-y-4')
  }, [hasReacted])

  function handleClick() {
    if (loading) return
    setCurrTranslate(nextTranslate)
    setNextTranslate(currTranslate)
    setHasReactedState(!hasReactedState)
    onClick()
  }

  return (
    <Button
      aria-label={hasReactedState ? 'Unlike' : 'Like'}
      onClick={handleClick}
      style={{ maxHeight: '32px', overflow: 'hidden' }}
    >
      {hasReactedState ? (
        <span className="relative text-red-500">
          <HeartIconSolid className="w-4 h-4" />
        </span>
      ) : (
        <span className="text-gray-500">
          <HeartIconOutline className="w-4 h-4" />
        </span>
      )}
      <div className="relative -top-px h-3">
        <div
          className={`flex flex-col items-center justify-center space-y-2 duration-300 ${currTranslate} transform transition-all`}
        >
          {hasReactedState ? (
            <>
              <span
                className={`h-2 transition-all duration-300 ${nextOpacity}`}
              >
                {nextCount}
              </span>
              <span
                className={`h-2 transition-all duration-300 ${currOpacity}`}
              >
                {count}
              </span>
            </>
          ) : (
            <>
              <span
                className={`h-2 transition-all duration-300 ${currOpacity}`}
              >
                {count}
              </span>
              <span
                className={`h-2 transition-all duration-300 ${nextOpacity}`}
              >
                {nextCount}
              </span>
            </>
          )}
        </div>
      </div>
    </Button>
  )
}
