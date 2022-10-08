import { useEffect, useRef } from 'react';

import useStore from 'src/store/boardStore';
import ModalContainer from '@/components/Modal/ModalContainer';
import SidebarItem from '@/components/Sidebar/SidebarItem';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import BoardIcon from '@/assets/icon-board.svg';
import ChevronDownIcon from '@/assets/icon-chevron-down.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import LogoMobile from '@/assets/logo-mobile.svg';

import type { Board } from 'src/types/boardTypes';

type SidebarMobileProps = {
  boards: Board[] | undefined;
};

const SidebarMobile = (props: SidebarMobileProps) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const store = useStore();

  const handleAddBoard = () => {
    store.toggleMobileSidebar();
    store.toggleAddBoardModal();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !buttonRef?.current?.contains(e.target as Node)
      ) {
        store.toggleMobileSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='md:hidden flex items-center gap-4 w-fit cursor-pointer'>
      <LogoMobile className='' />
      <div
        className='flex items-center gap-2'
        onClick={() => store.toggleMobileSidebar()}
        ref={buttonRef}
      >
        <h2 className='capitalize'>
          {store.selectedBoard?.boardName ?? 'No Boards'}
        </h2>
        <div className='mt-1 cursor-pointer'>
          <ChevronDownIcon
            className={`stroke-violet-700 transition ${
              store.showMobileSidebar && 'rotate-180'
            }`}
          />
        </div>
      </div>
      {store.showMobileSidebar && (
        <ModalContainer mobile>
          <div
            className='max-w-sm w-full z-50 rounded-xl overflow-hidden'
            ref={sidebarRef}
          >
            <div className='flex flex-col text-slate bg-white'>
              <div>
                <h4 className='uppercase p-4'>
                  All Boards ({props.boards?.length || 0})
                </h4>
                <ul className='pr-2'>
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
                      onClick={() => handleAddBoard()}
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
              <div className='py-4'>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
};

export default SidebarMobile;
