import create from 'zustand';

import { Board, Task } from 'src/types/boardTypes';

type BoardStore = {
  selectedBoard: Board | null;
  setSelectedBoard: (board: Board) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task) => void;
  showMobileSidebar: boolean;
  toggleMobileSidebar: () => void;
  showAddBoardModal: boolean;
  toggleAddBoardModal: () => void;
  showEditBoardModal: boolean;
  toggleEditBoardModal: () => void;
  showDeleteBoardModal: boolean;
  toggleDeleteBoardModal: () => void;
  showViewTaskModal: boolean;
  toggleViewTaskModal: () => void;
  showAddTaskModal: boolean;
  toggleAddTaskModal: () => void;
  showDeleteTaskModal: boolean;
  toggleDeleteTaskModal: () => void;
};

const useStore = create<BoardStore>((set) => ({
  selectedBoard: null,
  setSelectedBoard: (board: Board) => set({ selectedBoard: board }),
  selectedTask: null,
  setSelectedTask: (task: Task) => set({ selectedTask: task }),
  showMobileSidebar: false,
  toggleMobileSidebar: () =>
    set((state: { showMobileSidebar: boolean }) => ({
      showMobileSidebar: !state.showMobileSidebar,
    })),
  showAddBoardModal: false,
  toggleAddBoardModal: () =>
    set((state: { showAddBoardModal: boolean }) => ({
      showAddBoardModal: !state.showAddBoardModal,
    })),
  showEditBoardModal: false,
  toggleEditBoardModal: () =>
    set((state: { showEditBoardModal: boolean }) => ({
      showEditBoardModal: !state.showEditBoardModal,
    })),
  showDeleteBoardModal: false,
  toggleDeleteBoardModal: () =>
    set((state: { showDeleteBoardModal: boolean }) => ({
      showDeleteBoardModal: !state.showDeleteBoardModal,
    })),
  showViewTaskModal: false,
  toggleViewTaskModal: () =>
    set((state: { showViewTaskModal: boolean }) => ({
      showViewTaskModal: !state.showViewTaskModal,
    })),
  showAddTaskModal: false,
  toggleAddTaskModal: () =>
    set((state: { showAddTaskModal: boolean }) => ({
      showAddTaskModal: !state.showAddTaskModal,
    })),
  showDeleteTaskModal: false,
  toggleDeleteTaskModal: () =>
    set((state: { showDeleteTaskModal: boolean }) => ({
      showDeleteTaskModal: !state.showDeleteTaskModal,
    })),
}));

export default useStore;
