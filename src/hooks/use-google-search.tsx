import { useCallback, useState } from 'react'
import { GoogleBook, searchBooks } from '~/lib/google-books'
import useDebounce from 'react-use/lib/useDebounce'

export default function useGoogleSearch() {
  const [results, setResults] = useState<GoogleBook[]>([])
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [word, setWord] = useState('')

  const _search = useCallback(async (keyword: string) => {
    if (keyword.length === 0) {
      setResults([])
    } else {
      setLoading(false)
      setHasError(false)
      try {
        setResults(await searchBooks(keyword))
      } catch {
        setHasError(true)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  useDebounce(() => _search(word), 200, [word])

  return {
    hasError,
    results,
    search: (keyword: string) => setWord(keyword),
    loading,
  }
}
