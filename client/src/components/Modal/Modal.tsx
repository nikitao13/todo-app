import classes from './Modal.module.scss';
import { useModal } from '../../hooks/useModal';
import { updateTask } from '../../services/updateTask';
import { Category } from '../../types/types';
import Form from '../Todo/Form/Form';
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  categories: Category[];
  refreshTasks: () => void;
}

const Modal = ({ categories, refreshTasks }: ModalProps) => {
  const { isOpen, closeModal, selectedTask } = useModal();

  if (!isOpen) return null;

  const handleUpdateTask = async (
    taskId: number,
    taskName: string,
    categoryId: number
  ) => {
    try {
      await updateTask({ taskId, taskName, categoryId });
      refreshTasks();
      closeModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.container}>
        <div className={classes.modalContent}>
          <h2>{selectedTask ? 'Edit Task' : 'Add Task'}</h2>
          <RxCross2 onClick={closeModal} className={classes.icon}/>
        </div>

        <div className={classes.formWrapper}>
          <Form
            categories={categories}
            updateTask={handleUpdateTask}
            taskToEdit={selectedTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
