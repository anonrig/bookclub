import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import BookRecommend from '~/components/book-recommend'
import { NextSeo } from 'next-seo'

const RecommendBookPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Recommend a book" />
      <ListDetailView detail={<BookRecommend />} />
    </>
  )
}

export default RecommendBookPage
