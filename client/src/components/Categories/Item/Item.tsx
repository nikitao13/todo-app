import { Category } from '../../../types/types';
import classes from './Item.module.scss';

interface CategoryItemProps {
  category: Category;
  setSelectedCategory: (category: string) => void;  
}

const CategoryItem = ({ category, setSelectedCategory }: CategoryItemProps) => {
  return (
    <div className={classes.container} onClick={() => setSelectedCategory(category.name)}>
      <p>{category.name}</p>
    </div>
  );
};
export default CategoryItem;
