const _MS_PER_DAY = 1000 * 60 * 60 * 24

export function timestampToDaysUntil(timestamp: Date) {
  return Math.floor((timestamp.getMilliseconds() - Date.now()) / _MS_PER_DAY)
}

type Props = {
  timestamp?: number | string
  locale?: string
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
}

export function timestampToCleanTime({
  timestamp,
  locale = 'en-us',
  year = 'numeric',
  month = 'long',
  day = 'numeric',
}: Props) {
  const date = timestamp ? new Date(timestamp) : new Date()

  const formatted = date.toLocaleDateString(locale, {
    year,
    month,
    day,
  })

  const raw = date.toISOString()
  const daysUntil = timestampToDaysUntil(date)

  return {
    formatted,
    raw,
    daysUntil,
  }
}
