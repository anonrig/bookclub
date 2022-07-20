import { BOOKS_VOLUME_BASE } from '~/lib/google-books/constants'

export type GoogleBook = {
  id: string
  authors?: string[]
  imageLinks?: {
    smallThumbnail: string
    thumbnail: string
  }
  pageCount?: number
  previewLink: string
  publishedDate?: string
  title: string
  subtitle?: string
  description?: string
  industryIdentifiers: { type: string; identifier: string }[]
}

export async function searchBooks(keyword: string): Promise<GoogleBook[]> {
  const response = await fetch(
    `${BOOKS_VOLUME_BASE}?q=intitle:${keyword}&maxResults=40`
  )
  const json = await response.json()

  return json.items.map((item: any) => ({ id: item.id, ...item.volumeInfo }))
}

export async function getBookById(id: string): Promise<GoogleBook | null> {
  const response = await fetch(`${BOOKS_VOLUME_BASE}/${id}`)
  const json = await response.json()

  return { id: json.id, ...json.volumeInfo }
}
