import { Category, Task } from '../../../types/types';
import classes from './List.module.scss';
import Form from '../Form/Form';
import Item from '../Item/Item';

interface ListProps {
  tasks: Task[];
  categories: Category[];
  toggleTaskCompleted: (taskId: number) => void;
  addTask: (taskName: string, categoryId: number) => Promise<void>;
  handleDeleteTask: (taskId: number) => void;
}

const List = ({
  tasks,
  categories,
  toggleTaskCompleted,
  addTask,
  handleDeleteTask,
}: ListProps) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Todo List</h1>
      <Form categories={categories} addTask={addTask} />
      <ul>
        {tasks.map((task) => (
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
