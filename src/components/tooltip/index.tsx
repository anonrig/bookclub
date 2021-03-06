import 'tippy.js/dist/tippy.css'

import Tippy, { TippyProps } from '@tippyjs/react'

type Props = {
  content: string
  style?: any
  children: any
  placement?: TippyProps['placement']
}

export function Tooltip(props: Props) {
  const { style = {}, content, ...rest } = props

  return (
    <Tippy
      placement={props.placement ?? 'top'}
      touch={false}
      arrow={true}
      hideOnClick={false}
      content={
        <span className="text-sm font-medium" style={{ ...style }}>
          {content}
        </span>
      }
      popperOptions={{
        modifiers: [
          { name: 'preventOverflow', options: { element: 'window' } },
        ],
      }}
      {...rest}
    />
  )
}
