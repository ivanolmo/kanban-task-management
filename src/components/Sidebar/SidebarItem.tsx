import useStore from 'src/store/boardStore';
import BoardIcon from '@/assets/icon-board.svg';

import type { Board } from 'src/types/boardTypes';

type SidebarItemProps = {
  board: Board;
  selected: boolean;
};

const SidebarItem = (props: SidebarItemProps) => {
  const store = useStore();

  const handleSelect = () => {
    store.toggleMobileSidebar();
    store.setSelectedBoard(props.board);
  };

  return (
    <li
      className={`py-4 px-6 rounded-r-full mr-4 ${
        props.selected && 'bg-violet-700 text-white'
      }`}
    >
      <a
        href='#'
        className='flex items-center gap-3 text-md font-bold'
        onClick={() => handleSelect()}
      >
        <BoardIcon className='fill-current' />
        <span className='capitalize'>{props.board.boardName}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
