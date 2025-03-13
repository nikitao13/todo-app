import { useTasks } from './hooks/useTasks';
import { useEffect, useState } from 'react';
import AppWrapper from './components/AppWrapper/AppWrapper';
import List from './components/Todo/List/List';
import { fetchCategories } from './services/fetchCategories';
import Categories from './components/Categories/Categories';
import { Category } from './types/types';
import { ModalProvider } from './providers/ModalProvider';
import Modal from './components/Modal/Modal';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { tasks, toggleTaskCompleted, addTask, handleDeleteTask, getTasks } =
    useTasks();

  const getCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ModalProvider>
      <Modal categories={categories} refreshTasks={getTasks} />
      <AppWrapper>
        <Header />
        <Categories categories={categories} setCategories={setCategories} setSelectedCategory={setSelectedCategory} />
        <List
          tasks={tasks}
          categories={categories}
          toggleTaskCompleted={toggleTaskCompleted}
          addTask={addTask}
          handleDeleteTask={handleDeleteTask}
          selectedCategory={selectedCategory}
        />
        <Footer />
      </AppWrapper>
    </ModalProvider>
  );
}

export default App;
