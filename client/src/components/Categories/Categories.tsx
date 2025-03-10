import Form from './Form/Form';
import classes from './Categories.module.scss';
import { Category } from '../../types/types';
import { createCategory } from '../../services/createCategory';

interface CategoriesProps {
  categories: Category[];
  setCategories: (update: (prev: Category[]) => Category[]) => void;
}

const Categories = ({ categories, setCategories }: CategoriesProps) => {
  const categoriesString = categories
    .map((category) => category.name)
    .join(', ');

  const handleAddCategory = async (categoryName: string) => {
    try {
      const newCategory = await createCategory(categoryName);

      setCategories((prev) => [...prev, newCategory]);
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Task Categories</h1>
      <div className={classes.categories}>
        <p className={classes.categoriesString}>{categoriesString}</p>
      </div>

      <Form onAddCategory={handleAddCategory} />
    </div>
  );
};
export default Categories;
