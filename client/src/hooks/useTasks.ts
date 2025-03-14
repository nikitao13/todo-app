import { useEffect, useState } from 'react';
import { fetchTasks } from '../services/fetchTasks';
import { createTask } from '../services/createTask';
import { deleteTask } from '../services/deleteTask';
import { updateTask } from '../services/updateTask';
import { Task } from '../types/types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const toggleTaskCompleted = async (taskId: number) => {
    const currentTask = tasks.find((task) => task.taskId === taskId);
    if (!currentTask) return;

    const updatedCompleted = !currentTask.completed;
    try {
      const updated = await updateTask({
        taskId,
        taskName: currentTask.taskName,
        completed: updatedCompleted,
        categoryId: currentTask.category?.id,
      });

      setTasks((prev) =>
        prev.map((task) => (task.taskId === taskId ? updated : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const addTask = async (
    taskName: string,
    categoryId: number,
    priority: string
  ): Promise<string | null> => {
    try {
      const newTask = await createTask({
        taskName,
        completed: false,
        categoryId,
        priority: priority.toUpperCase(),
      });

      setTasks((prev) => [...prev, newTask]);
      return null;
    } catch (error) {
      console.error('Error creating task:', error);

      return error instanceof Error
        ? error.message
        : 'An unexpected error occurred.';
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.taskId !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return {
    tasks,
    setTasks,
    getTasks,
    toggleTaskCompleted,
    addTask,
    handleDeleteTask,
  };
};
