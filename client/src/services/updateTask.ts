import { Task } from '../types/types';

const url = import.meta.env.VITE_API_URL;

interface UpdateTaskParams {
  taskId: number;
  taskName?: string;
  completed?: boolean;
  categoryId?: number;
}

export const updateTask = async ({
  taskId,
  taskName,
  completed,
  categoryId,
}: UpdateTaskParams): Promise<Task> => {
  const body = {
    taskName,
    completed,
    categoryId,
  };

  const response = await fetch(`${url}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  const updatedTask: Task = await response.json();
  return updatedTask;
};
