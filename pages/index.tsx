import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import NavBar from '../components/nav-bar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
    </>
  )
}

export default withUrqlClient(createUrqlClient)(Home);
