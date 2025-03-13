import { Task } from '../types/types';
import { endpoint } from './endpoint';

interface UpdateTaskParams {
  taskId: number;
  taskName?: string;
  completed?: boolean;
  priority?: string;
  categoryId?: number;
}

export const updateTask = async ({
  taskId,
  taskName,
  completed,
  priority,
  categoryId,
}: UpdateTaskParams): Promise<Task> => {
  const body = {
    taskName,
    completed,
    priority,
    categoryId,
  };

  const response = await fetch(`${endpoint}/tasks/${taskId}`, {
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
