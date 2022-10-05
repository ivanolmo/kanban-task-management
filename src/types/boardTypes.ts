export type Column = {
  id: string;
  boardId: string;
  columnName: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  completed: boolean;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
};

export type Subtask = {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Board = {
  id: string;
  userId: string;
  boardName: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
};
