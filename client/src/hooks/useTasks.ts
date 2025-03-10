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

  const addTask = async (taskName: string, categoryId: number) => {
    try {
      const newTask = await createTask({
        taskName,
        completed: false,
        categoryId,
      });
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error('Error creating task:', error);
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
