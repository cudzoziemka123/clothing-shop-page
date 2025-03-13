import Directory from '../../components/directory/directory.component'
import categories from '../../data/categories'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Directory categories={categories} />
      <Outlet />
    </>
  )
}

export default Home
