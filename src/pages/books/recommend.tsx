import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'
import BookRecommend from '~/components/book-recommend'

const RecommendBookPage: NextPage = () => {
  return <ListDetailView detail={<BookRecommend />} />
}

export default RecommendBookPage
