import { CategoriesContainer } from './directory.styles'
import DirectoryItem from '../directory-item/directory-item.component'
import categories from '../../data/categories'

const Directory = () => {
  return (
    <CategoriesContainer>
      {categories.map((category) => {
        return <DirectoryItem key={category.id} category={category} />
      })}
    </CategoriesContainer>
  )
}
export default Directory
