import { Task } from '../../../types/types';
import classes from './Item.module.scss';
import { useModal } from '../../../hooks/useModal';

interface ItemProps {
  task: Task;
  toggleTaskCompleted: (taskId: number) => void;
  handleDeleteTask: (taskId: number) => void;
}

const Item = ({ task, toggleTaskCompleted, handleDeleteTask }: ItemProps) => {
  const { openModal } = useModal();

  return (
    <div className={classes.container}>
      <p>{task.taskName}</p>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompleted(task.taskId)}
      />
      <button className={classes.categoryLabel}>{task.category.name}</button>
      <button className={classes.edit} onClick={() => openModal(task)}>
        Edit
      </button>
      <button
        onClick={() => handleDeleteTask(task.taskId)}
        className={classes.delete}
      >
        Delete
      </button>
    </div>
  );
};

export default Item;
