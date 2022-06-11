import TextareaAutosize from 'react-autosize-textarea'
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

const styles =
  'w-full rounded-md text-primary px-4 py-2 text-primary bg-gray-1000 dark:bg-white dark:bg-opacity-5 bg-opacity-5 hover border-gray-200 dark:border-gray-700'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles} {...props} />
}

export function Textarea({ maxRows = 8, rows = 1, ...props }) {
  return (
    <TextareaAutosize
      maxRows={maxRows}
      rows={rows}
      className={`${styles} block`}
      {...props}
    />
  )
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={styles} {...props} />
}
