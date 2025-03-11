import { Category } from '../types/types';
import { endpoint } from './endpoint';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${endpoint}/categories`);

    if (!response.ok) throw new Error('Failed to fetch categories');

    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
