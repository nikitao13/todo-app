import { Category } from '../types/types';

const url = import.meta.env.VITE_API_URL;

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${url}/categories`);

    if (!response.ok) throw new Error('Failed to fetch categories');

    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
