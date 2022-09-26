import BoardIcon from '@/assets/icon-board.svg';
import type { Board } from 'src/types/boardTypes';

type SidebarItemProps = {
  board: Board;
  selected: boolean;
  handleSelectBoard: (board: Board) => void;
};

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <li
      className={`py-4 px-6 rounded-r-full mr-4 ${
        props.selected && 'bg-violet-700 text-white'
      }`}
    >
      <a
        href='#'
        className='flex items-center gap-3 text-md font-bold'
        onClick={() => props.handleSelectBoard(props.board)}
      >
        <BoardIcon className='fill-current' />
        <span className=''>{props.board.boardName}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
