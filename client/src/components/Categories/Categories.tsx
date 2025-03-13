import Form from './Form/Form';
import classes from './Categories.module.scss';
import { Category } from '../../types/types';
import { createCategory } from '../../services/createCategory';
import CategoryItem from './Item/Item';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
interface CategoriesProps {
  categories: Category[];
  setCategories: (update: (prev: Category[]) => Category[]) => void;
  setSelectedCategory: (category: string) => void;
}

const Categories = ({
  categories,
  setCategories,
  setSelectedCategory,
}: CategoriesProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
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
      <div className={classes.categoryHeader}>
        <h1 className={classes.title}>Task Categories</h1>
        <FaPlus className={classes.icon} onClick={() => setIsFormVisible((prev) => !prev)} size={12} />
      </div>
      <div className={classes.categories}>
        <div
          className={classes.showAll}
          onClick={() => setSelectedCategory('all')}
        >
          <p>Show All</p>
        </div>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>

      {isFormVisible && <Form onAddCategory={handleAddCategory} setIsFormVisible={setIsFormVisible}/>}
    </div>
  );
};
export default Categories;
