const _MS_PER_DAY = 1000 * 60 * 60 * 24

export function timestampToDaysUntil(timestamp: Date, origin?: number) {
  return Math.floor(
    (timestamp.getTime() - (origin ?? Date.now())) / _MS_PER_DAY
  )
}

export function timestampToRelative(timestamp: Date, origin?: number) {
  const deltaDays =
    (timestamp.getTime() - (origin ?? Date.now())) / (1000 * 3600 * 24)
  const formatter = new Intl.RelativeTimeFormat()

  if (Math.round(deltaDays) === 0) {
    return 'today'
  }

  return formatter.format(Math.round(deltaDays), 'days')
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
  const relativeDays = timestampToRelative(date)

  return {
    formatted,
    raw,
    daysUntil,
    relativeDays,
  }
}
