import type { NextPage } from 'next'
import { ListDetailView } from '~/components/layouts'

const Home: NextPage = () => {
  return <ListDetailView hasDetail detail={<h1>hello</h1>} />
}

export default Home
