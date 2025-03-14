import { endpoint } from './endpoint';

interface CreateTaskParams {
  taskName: string;
  completed: boolean;
  categoryId: number;
  priority: string;
}

export const createTask = async (task: CreateTaskParams) => {
  try {
    const response = await fetch(`${endpoint}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || 'An error occurred while creating the task.'
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
