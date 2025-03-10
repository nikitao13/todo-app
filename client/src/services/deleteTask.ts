const url = import.meta.env.VITE_API_URL;

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    const response = await fetch(`${url}/tasks/${taskId}`, {
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
