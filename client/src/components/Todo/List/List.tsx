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
  addTask: (
    taskName: string,
    categoryId: number,
    priority: string
  ) => Promise<string | null>;
  handleDeleteTask: (taskId: number) => void;
  selectedCategory: string;
}

const filterTasksByCategory = (tasks: Task[], selectedCategory: string) => {
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
  const filteredTasks = filterTasksByCategory(tasks, selectedCategory);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className={classes.container}>
      <div className={classes.todoHeader}>
        <h1 className={classes.title}>Todo List</h1>
        <FaPlus
          className={classes.icon}
          onClick={() => setIsFormVisible((prev) => !prev)}
          size={12}
        />
      </div>

      {isFormVisible && (
        <Form
          categories={categories}
          addTask={addTask}
          setIsFormVisible={setIsFormVisible}
        />
      )}

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
          .sort((a, b) => {
            const priorityOrder: Record<string, number> = {
              HIGH: 1,
              MEDIUM: 2,
              LOW: 3,
            };

            const priorityComparison =
              priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityComparison !== 0) return priorityComparison;

            if (a.completed !== b.completed) return a.completed ? -1 : 1;

            return b.taskId - a.taskId;
          })
          .map((task) => (
            <Item
              key={task.taskId}
              task={task}
              toggleTaskCompleted={toggleTaskCompleted}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>

      {completedTasks.length === 0 && tasks.length > 0 && (
        <p>Every big achievement starts with the first step!</p>
      )}

      {completedTasks.length > 0 && (
        <p>
          You have completed {completedTasks.length}/{tasks.length} tasks! ⭐
        </p>
      )}

      {completedTasks.length > 0 && completedTasks.length === tasks.length && (
        <p className={classes.congrats}>
          Well done! You have completed all your tasks.
        </p>
      )}
    </div>
  );
};

export default List;
