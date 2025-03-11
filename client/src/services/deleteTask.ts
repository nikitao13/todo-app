import { endpoint } from './endpoint';

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    const response = await fetch(`${endpoint}/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
