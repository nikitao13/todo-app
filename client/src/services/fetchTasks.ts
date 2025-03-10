import { Task } from '../types/types';

const url = import.meta.env.VITE_API_URL;

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${url}/tasks`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
