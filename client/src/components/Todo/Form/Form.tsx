import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import classes from './Form.module.scss';
import { Category, Task } from '../../../types/types';

interface FormData {
  task: string;
  categoryId: number;
}

interface FormProps {
  categories: Category[];
  addTask?: (taskName: string, categoryId: number) => void;
  updateTask?: (taskId: number, taskName: string, categoryId: number) => void;
  taskToEdit?: Task | null;
}

const Form = ({ categories, addTask, updateTask, taskToEdit }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!taskToEdit) return;
    setValue('task', taskToEdit.taskName);
    setValue('categoryId', taskToEdit.category.id);
  }, [taskToEdit, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form data:', data);

    if (taskToEdit && updateTask) {
      updateTask(taskToEdit.taskId, data.task, data.categoryId);
    } else if (addTask) {
      addTask(data.task, data.categoryId);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <input
        placeholder="Task name"
        autoComplete="off"
        {...register('task', { required: true })}
      />
      {errors.task && (
        <span className={classes.error}>This field is required</span>
      )}

      <select
        defaultValue=""
        {...register('categoryId', { required: true, valueAsNumber: true })}
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.categoryId && (
        <span className={classes.error}>Category is required</span>
      )}

      <button type="submit" className={classes.btn}>{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default Form;
