import { useForm, SubmitHandler } from 'react-hook-form';
import classes from './Form.module.scss';
import { useState } from 'react';

interface FormData {
  category: string;
}

interface FormProps {
  onAddCategory: (newCategory: string) => Promise<string | null>;
  setIsFormVisible?: (isVisible: boolean) => void;
}

const Form = ({ onAddCategory, setIsFormVisible }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [backendError, setBackendError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setBackendError(null);

    const errorMsg = await onAddCategory(data.category);

    if (errorMsg) {
      setBackendError(errorMsg);
      setValue('category', '');
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
        placeholder={
          backendError || errors.category?.message || 'Type category here...'
        }
        autoComplete="off"
        {...register('category', { required: 'Category is required' })}
        style={
          backendError || errors.category ? { border: '1px solid red' } : {}
        }
      />

      <button type="submit" className={classes.btn}>
        Add category
      </button>
    </form>
  );
};

export default Form;
