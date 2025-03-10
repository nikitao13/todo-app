const url = import.meta.env.VITE_API_URL;

interface CreateTaskParams {
  taskName: string;
  completed: boolean;
  categoryId: number;
}

export const createTask = async (task: CreateTaskParams) => {
  try {
    const response = await fetch(`${url}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const savedTask = await response.json();
    return savedTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
