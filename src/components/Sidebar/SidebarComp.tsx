import { useState } from 'react';

import SidebarItem from '@/components/Sidebar/SidebarItem';
import BoardIcon from '@/assets/icon-board.svg';
import DarkThemeIcon from '@/assets/icon-dark-theme.svg';
import HideSidebarIcon from '@/assets/icon-hide-sidebar.svg';
import LightThemeIcon from '@/assets/icon-light-theme.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import type { Board } from 'src/types/boardTypes';

type SidebarProps = {
  boards: Board[] | undefined;
  selectedBoardId: string;
  handleSelectBoard: (board: Board) => void;
  toggleAddBoardModal: () => void;
  toggleSidebar: () => void;
};

const SidebarComp = (props: SidebarProps) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleClick = () => setCheckboxChecked(!checkboxChecked);

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
                selected={board.id === props.selectedBoardId}
                board={board}
                handleSelectBoard={props.handleSelectBoard}
              />
            ))}
            <li className='py-4 px-6 rounded-r-full mr-4'>
              <a
                href='#'
                className='flex items-center gap-3 text-md font-bold '
                onClick={() => props.toggleAddBoardModal()}
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
          <div className='flex justify-center items-center gap-6 mx-3 py-3.5 bg-violet-50 rounded-lg'>
            <LightThemeIcon
              className={`ease-in-out duration-700 ${
                checkboxChecked ? 'fill-slate' : 'fill-yellow'
              }`}
            />
            {/* theme switcher */}
            <div className='relative'>
              <input
                type='checkbox'
                id='toggle'
                className='hidden checkbox'
                onClick={() => handleClick()}
                checked={checkboxChecked}
                readOnly
              />
              <label
                htmlFor='toggle'
                className='relative flex w-10 h-5 bg-violet-700 border border-violet-700 rounded-full cursor-pointer theme-label'
              />
            </div>
            <DarkThemeIcon
              className={`ease-in-out duration-700 ${
                checkboxChecked ? 'fill-blue' : 'fill-slate'
              }`}
            />
          </div>
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
