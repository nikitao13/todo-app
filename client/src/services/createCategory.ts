import { Category } from '../types/types';
import { endpoint } from './endpoint';

export const createCategory = async (
  name: string
): Promise<string | Category> => {
  try {
    const response = await fetch(`${endpoint}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.error || 'Failed to create category';
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    return 'An unexpected error occurred.';
  }
};
