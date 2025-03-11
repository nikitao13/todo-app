import { Task } from '../types/types';
import { endpoint } from './endpoint';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${endpoint}/tasks`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
