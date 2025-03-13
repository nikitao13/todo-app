import { useForm, SubmitHandler } from 'react-hook-form';
import classes from './Form.module.scss';

interface FormData {
  category: string;
}

interface FormProps {
  onAddCategory: (newCategory: string) => void;
  setIsFormVisible?: (isVisible: boolean) => void;
}

const Form = ({ onAddCategory, setIsFormVisible }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    onAddCategory(data.category);
    if (setIsFormVisible) {
      setIsFormVisible(false);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <input
        placeholder="Type category here..."
        autoComplete="off"
        {...register('category', { required: true })}
      />
      <button type="submit" className={classes.btn}>
        Add category
      </button>
      {errors.category && (
        <span className={classes.error}>this field is required</span>
      )}
    </form>
  );
};

export default Form;
