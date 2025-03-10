import { useState, ReactNode } from 'react';
import { ModalContext } from '../context/ModalContext';
import { Task } from '../types/types'; 

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, selectedTask }}
    >
      {children}
    </ModalContext.Provider>
  );
};
