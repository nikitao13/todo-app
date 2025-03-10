import { useTasks } from './hooks/useTasks';
import { useEffect, useState } from 'react';
import AppWrapper from './components/AppWrapper/AppWrapper';
import List from './components/Todo/List/List';
import { fetchCategories } from './services/fetchCategories';
import Categories from './components/Categories/Categories';
import { Category } from './types/types';
import { ModalProvider } from './providers/ModalProvider';
import Modal from './components/Modal/Modal';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
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
        <Categories categories={categories} setCategories={setCategories} />
        <List
          tasks={tasks}
          categories={categories}
          toggleTaskCompleted={toggleTaskCompleted}
          addTask={addTask}
          handleDeleteTask={handleDeleteTask}
        />
      </AppWrapper>
    </ModalProvider>
  );
}

export default App;
