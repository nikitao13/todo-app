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
      <div className={classes.checkNameContainer}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompleted(task.taskId)}
        />
        <p className={task.completed ? classes.completed : ''}>
          {task.taskName}
        </p>
      </div>
      <div className={classes.btnContainer}>
        <p
          className={`${classes.priority} ${
            task.priority === 'HIGH' ? classes.highPriority : ''
          }`}
        >
          {task.priority} PRIORITY
        </p>
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
    </div>
  );
};

export default Item;
