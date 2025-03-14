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
  const body = { taskName, completed, priority, categoryId };

  try {
    const response = await fetch(`${endpoint}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update task');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
