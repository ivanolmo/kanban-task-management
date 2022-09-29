import create from 'zustand';

import { Board } from 'src/types/boardTypes';

interface BoardStore {
  selectedBoard: Board | null;
  setSelectedBoard: (board: Board) => void;
  showMobileSidebar: boolean;
  toggleMobileSidebar: () => void;
  showAddBoardModal: boolean;
  toggleAddBoardModal: () => void;
  showEditBoardModal: boolean;
  toggleEditBoardModal: () => void;
  showDeleteBoardModal: boolean;
  toggleDeleteBoardModal: () => void;
}

const useStore = create<BoardStore>((set) => ({
  selectedBoard: null,
  setSelectedBoard: (board: Board) => set({ selectedBoard: board }),
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
}));

export default useStore;
