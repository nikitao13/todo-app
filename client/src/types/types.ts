export interface Task {
  taskId: number;
  taskName: string;
  completed: boolean;
  priority: string;
  category: {
    id: number;
    name: string;
  };
}

export interface Category {
  id: number;
  name: string;
}
