import type { Control, FieldPath, FieldValues } from 'react-hook-form';

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

export interface SelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  handleColumnMove?: (columnId: string, taskId: string) => void;
}
