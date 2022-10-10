import useStore from 'src/store/boardStore';
import SidebarItem from '@/components/Sidebar/SidebarItem';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import BoardIcon from '@/assets/icon-board.svg';
import HideSidebarIcon from '@/assets/icon-hide-sidebar.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';

import type { Board } from 'src/types/boardTypes';

type SidebarProps = {
  boards: Board[] | undefined;
  toggleSidebar: () => void;
};

const SidebarComp = (props: SidebarProps) => {
  const store = useStore();
  return (
    <aside
      className='!w-64 hidden md:block flex-shrink-0 z-10'
      aria-label='Sidebar'
    >
      <div className='flex flex-col justify-between text-slate bg-white border-r border-indigo h-screen py-8'>
        <div>
          <h4 className='uppercase ml-6'>
            All Boards ({props.boards?.length || 0})
          </h4>
          <ul className='mt-5'>
            {props.boards?.map((board) => (
              <SidebarItem
                key={board.id}
                selected={board.id === store.selectedBoard?.id}
                board={board}
              />
            ))}
            <li className='py-4 px-6 rounded-r-full mr-4'>
              <a
                href='#'
                className='flex items-center gap-3 text-md font-bold '
                onClick={() => store.toggleAddBoardModal()}
              >
                <BoardIcon className='fill-violet-700' />
                <span className='flex items-center gap-1 text-violet-700'>
                  <PlusIcon className='fill-violet-700' />
                  Create New Board
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4'>
          <ThemeSwitcher />
          <div
            className='flex items-center gap-3 mx-3 py-3.5 px-4 rounded-lg cursor-pointer group'
            onClick={() => props.toggleSidebar()}
          >
            <HideSidebarIcon className='fill-slate group-hover:fill-gunmetal-700' />
            <span className='text-slate group-hover:text-gunmetal-700'>
              Hide Sidebar
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarComp;
