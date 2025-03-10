import { Category } from '../types/types';

const url = import.meta.env.VITE_API_URL;

export const createCategory = async (name: string): Promise<Category> => {
  try {
    const response = await fetch(`${url}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Failed to create category');
    }

    const newCategory: Category = await response.json();
    return newCategory;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};
