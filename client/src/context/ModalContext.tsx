import { createContext } from 'react';
import { Task } from '../types/types';

interface ModalContextType {
  isOpen: boolean;
  openModal: (task: Task) => void;
  closeModal: () => void;
  selectedTask: Task | null;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
