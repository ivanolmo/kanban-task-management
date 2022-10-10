import { useState } from 'react';
import { signOut } from 'next-auth/react';

import useStore from 'src/store/boardStore';
import Button from '@/components/Button';
import SidebarMobile from '@/components/Sidebar/SidebarMobile';
import CrossIcon from '@/assets/icon-cross.svg';
import EditIcon from '@/assets/icon-edit.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import SignOutIcon from '@/assets/icon-sign-out.svg';
import ThreeDotsIcon from '@/assets/icon-vertical-ellipsis.svg';
import LogoDark from '@/assets/logo-dark.svg';

import type { Board } from 'src/types/boardTypes';

type HeaderProps = {
  boards: Board[] | undefined;
  sidebarVisible: boolean;
};

const Header = (props: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const store = useStore();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDelete = () => {
    store.toggleDeleteBoardModal();
    toggleMenu();
  };

  const handleEdit = () => {
    store.toggleEditBoardModal();
    toggleMenu();
  };

  return (
    <header className='flex items-center h-16 bg-white'>
      <div
        className={`hidden md:flex items-center h-full border-r border-indigo px-4 md:px-6 ${
          props.sidebarVisible && 'w-64'
        }`}
      >
        <LogoDark className='hidden md:block' />
      </div>
      <div className='flex flex-1 justify-between items-center w-full pl-4 md:pl-6 md:pr-2'>
        <SidebarMobile
          // TODO only needs names not all board data?
          boards={props.boards}
        />
        <h2 className='hidden md:block capitalize'>
          {store.selectedBoard?.boardName ?? 'No Boards'}
        </h2>
        <div className='flex items-center gap-1 md:gap-2.5'>
          <Button
            variant='primary'
            size='rg'
            disabled={!store.selectedBoard?.columns}
            onClick={() => store.toggleAddTaskModal()}
          >
            <PlusIcon className='fill-white' />
            <span className='hidden md:inline'>Add New Task</span>
          </Button>
          <div
            className={`relative px-4 cursor-pointer ${
              !store.selectedBoard?.columns
                ? 'cursor-not-allowed opacity-25'
                : 'cursor-pointer'
            }`}
            onClick={() => toggleMenu()}
          >
            <ThreeDotsIcon
              className={`transition ${showMenu && 'rotate-90'}`}
            />
            {showMenu && (
              <div className='absolute flex flex-col gap-6 bg-white  p-4 rounded-xl top-12 right-4 w-48 shadow-md'>
                <span
                  className='flex justify-between items-center text-slate cursor-pointer'
                  onClick={() => handleEdit()}
                >
                  Edit Board
                  <EditIcon className='fill-white stroke-slate w-6 h-6' />
                </span>
                <span
                  className='flex justify-between items-center text-red-600 cursor-pointer'
                  onClick={() => handleDelete()}
                >
                  Delete Board
                  <CrossIcon className='stroke-red-600 w-6 h-6' />
                </span>
                <span
                  className='flex justify-between items-center text-red-600 cursor-pointer'
                  onClick={() =>
                    signOut({
                      callbackUrl: `${window.location.origin}`,
                    })
                  }
                >
                  Sign Out
                  <SignOutIcon className='fill-transparent stroke-red-600 w-6 h-6' />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
