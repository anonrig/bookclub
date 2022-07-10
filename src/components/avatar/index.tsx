import Image, { ImageProps } from 'next/future/image'
import { useEffect, useState } from 'react'
import { Maybe } from '~/graphql/types.generated'

export function Avatar({
  user,
  src,
  width,
  height,
  ...props
}: {
  user: { name: string }
  src?: Maybe<string>
  width: number
  height: number
} & ImageProps) {
  const fallbackUrl = '/static/img/fallback-avatar.png'
  const [srcState, setSrcState] = useState(src || fallbackUrl)

  // forces avatars to update if the component is in the same place between
  // page loads, e.g. changing between AMA questions, the header avatar should
  // update
  useEffect(() => {
    if (src) setSrcState(src)
  }, [src])

  return (
    <Image
      alt={`${user.name}'s profile photo`}
      src={srcState}
      width={width}
      height={height}
      {...props}
      onError={() => {
        setSrcState(fallbackUrl)
      }}
    />
  )
}
