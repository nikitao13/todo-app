import { Category, Task } from '../../../types/types';
import classes from './List.module.scss';
import Form from '../Form/Form';
import Item from '../Item/Item';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface ListProps {
  tasks: Task[];
  categories: Category[];
  toggleTaskCompleted: (taskId: number) => void;
  addTask: (taskName: string, categoryId: number) => Promise<void>;
  handleDeleteTask: (taskId: number) => void;
  selectedCategory: string;
}

const filterTasks = (tasks: Task[], selectedCategory: string) => {
  if (selectedCategory === 'all') return tasks;
  return tasks.filter((task) => task.category.name === selectedCategory);
};

const List = ({
  tasks,
  categories,
  toggleTaskCompleted,
  addTask,
  handleDeleteTask,
  selectedCategory,
}: ListProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const filteredTasks = filterTasks(tasks, selectedCategory);

  return (
    <div className={classes.container}>
      <div className={classes.todoHeader}>
        <h1 className={classes.title}>Todo List</h1>
        <FaPlus
          className={classes.icon}
          onClick={() => setIsFormVisible((prev) => !prev)}
          size={14}
        />
      </div>

      {isFormVisible && <Form categories={categories} addTask={addTask} />}

      {selectedCategory !== 'all' && (
        <p className={classes.categoryTitle}>{selectedCategory} tasks</p>
      )}

      <ul>
        {filteredTasks.length === 0 && (
          <p className={classes.noTasksFound}>
            No tasks found for category {selectedCategory.toLowerCase()}...
          </p>
        )}
        {filteredTasks
          .slice()
          .reverse()
          .map((task) => (
            <Item
              key={task.taskId}
              task={task}
              toggleTaskCompleted={toggleTaskCompleted}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
    </div>
  );
};

export default List;
