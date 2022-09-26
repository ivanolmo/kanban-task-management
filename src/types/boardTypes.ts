export type Column = {
  id: string;
  boardId: string;
  columnName: string;
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
