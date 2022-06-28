import { LoadingSpinner } from '~/components/loading-spinner'

import Button from '../button'
import { TitleBar } from './title-bar'
import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'
import { BookOpenIcon, LocationMarkerIcon } from '@heroicons/react/outline'

function ContentContainer(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8"
      {...props}
    />
  )
}

const Container = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>((props, ref) => {
  return (
    <div
      ref={ref}
      id="main"
      className="relative flex max-h-screen w-full flex-col overflow-y-auto bg-white dark:bg-black"
      {...props}
    />
  )
})
Container.displayName = 'Container'

function Header(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="space-y-3" {...props} />
}

const Title = forwardRef<
  HTMLHeadingElement,
  PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>
>((props, ref) => {
  return (
    <h1
      ref={ref}
      className="text-primary font-sans text-2xl font-bold xl:text-3xl"
      {...props}
    />
  )
})
Title.displayName = 'Title'

function Loading() {
  return (
    <Container>
      <div className="flex flex-1 flex-col items-center justify-center">
        <LoadingSpinner />
      </div>
    </Container>
  )
}

function Null({
  title = 'Not found',
  subtitle = 'What you seek does not exist.',
  description = 'Maybe this link is broken. Maybe something was deleted, or moved. In any case, there’s nothing to see here...',
  action = {
    href: '/',
    title: 'Go home',
  },
}: {
  title?: string
  subtitle?: string
  description?: string
  action?: {
    href: string
    title: string
  }
}) {
  return (
    <Container>
      <TitleBar title={title} />
      <div className="flex flex-1 flex-col items-center justify-center space-y-6 px-8 text-center lg:px-16">
        <BookOpenIcon className="text-secondary h-8 w-8" />
        <div className="flex flex-col space-y-1">
          <p className="text-primary font-semibold">{subtitle}</p>
          <p className="text-tertiary">{description}</p>
        </div>
        <Button href={action.href}>{action.title}</Button>
      </div>
    </Container>
  )
}

export const Detail = {
  Container,
  ContentContainer,
  Header,
  Title,
  Loading,
  Null,
}
