import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import classes from './Form.module.scss';
import { Category, Task } from '../../../types/types';

interface FormData {
  task: string;
  categoryId: number;
  priority: string;
}

interface FormProps {
  categories: Category[];
  addTask?: (
    taskName: string,
    categoryId: number,
    priority: string
  ) => Promise<string | null>;
  updateTask?: (
    taskId: number,
    taskName: string,
    categoryId: number,
    priority: string
  ) => Promise<string | null>;
  taskToEdit?: Task | null;
  setIsFormVisible?: (isVisible: boolean) => void;
}

const Form = ({
  categories,
  addTask,
  updateTask,
  taskToEdit,
  setIsFormVisible,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskToEdit) return;
    setValue('task', taskToEdit.taskName);
    setValue('categoryId', taskToEdit.category.id);
    setValue('priority', taskToEdit.priority);
  }, [taskToEdit, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setBackendError(null);

    let errorMsg: string | null = null;

    if (taskToEdit && updateTask) {
      errorMsg = await updateTask(
        taskToEdit.taskId,
        data.task,
        data.categoryId,
        data.priority.toUpperCase()
      );
    } else if (addTask) {
      errorMsg = await addTask(
        data.task,
        data.categoryId,
        data.priority.toUpperCase()
      );
    }

    if (errorMsg) {
      setBackendError(errorMsg);
      setValue('task', '');
      return;
    }

    if (setIsFormVisible) {
      setIsFormVisible(false);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <input
        placeholder={backendError || errors.task?.message || 'Task name'}
        autoComplete="off"
        {...register('task', { required: 'Task name is required' })}
        style={backendError || errors.task ? { border: '1px solid red' } : {}}
      />

      <select
        defaultValue=""
        {...register('categoryId', {
          required: 'Category required',
          valueAsNumber: true,
        })}
        style={
          errors.categoryId ? { border: '1px solid red', color: 'red' } : {}
        }
      >
        <option value="" disabled>
          {errors.categoryId ? errors.categoryId.message : 'Category'}
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        defaultValue=""
        {...register('priority', { required: 'Priority required' })}
        style={errors.priority ? { border: '1px solid red', color: 'red' } : {}}
      >
        <option value="" disabled>
          {errors.priority ? errors.priority.message : 'Priority'}
        </option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      <button type="submit" className={classes.btn}>
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default Form;
