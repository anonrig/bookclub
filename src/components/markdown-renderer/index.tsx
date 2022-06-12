import deepmerge from 'deepmerge'
import Link from 'next/link'
import * as React from 'react'
import Markdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import linkifyRegex from 'remark-linkify-regex'
import { PropsWithChildren } from 'react'

function LinkRenderer({ href, ...rest }: any) {
  // auto-link headings
  if (href.startsWith('#')) {
    return <a href={href} {...rest} />
  }

  if (href.startsWith('@')) {
    // link to a mention
    return (
      <Link href={`/u/${href.slice(1)}`} {...rest}>
        <a {...rest} />
      </Link>
    )
  }
  try {
    const url = new URL(href)
    if (url.origin === 'https://nizipli.com') {
      return (
        <Link href={href}>
          <a {...rest} />
        </Link>
      )
    }
    return <a target="_blank" rel="noreferrer" href={href} {...rest} />
  } catch (e) {
    console.error(e)
    return <a target="_blank" rel="noreferrer" href={href} {...rest} />
  }
}

function getComponentsForVariant(variant: string) {
  switch (variant) {
    case 'longform': {
      return {
        a: LinkRenderer,
      }
    }
    // Questions, comments, descriptions on bookmarks, etc.
    case 'comment': {
      return {
        a: LinkRenderer,
        h1: 'p',
        h2: 'p',
        h3: 'p',
        h4: 'p',
        h5: 'p',
        h6: 'p',
        pre({ children }: PropsWithChildren<unknown>) {
          return <>{children}</>
        },
      }
    }
  }
}

export function MarkdownRenderer({
  children,
  variant = 'longform',
  ...rest
}: {
  children: string
  className?: string
  variant?: 'longform' | 'comment'
}) {
  const schema = deepmerge(defaultSchema, {
    tagNames: [...(defaultSchema.tagNames ?? []), 'sup', 'sub', 'section'],
    attributes: {
      '*': ['className'],
    },
    clobberPrefix: '',
    clobber: ['name', 'id'],
  })

  const components = getComponentsForVariant(variant)

  return (
    <Markdown
      {...rest}
      remarkPlugins={[remarkGfm, linkifyRegex(/^(?!.*\bRT\b)(?:.+\s)?@\w+/i)]}
      rehypePlugins={[
        [rehypeSanitize, schema],
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ]}
      components={components as never}
    >
      {children}
    </Markdown>
  )
}
