import { useCallback, useState } from 'react';

import useStore from 'src/store/boardStore';
import Button from '@/components/Button';
import SidebarMobile from '@/components/Sidebar/SidebarMobile';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import LogoDark from '@/assets/logo-dark.svg';

import type { Board } from 'src/types/boardTypes';
import Submenu from '@/components/ui/Submenu';

type HeaderProps = {
  boards: Board[] | undefined;
  sidebarVisible: boolean;
};

const Header = (props: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const store = useStore();

  const toggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

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
          <div>
            <Button
              variant='primary'
              size='rg'
              disabled={!store.selectedBoard?.columns}
              onClick={() => store.toggleAddTaskModal()}
            >
              <PlusIcon className='fill-white' />
              <span className='hidden md:inline'>Add New Task</span>
            </Button>
          </div>
          <Submenu
            boards={props.boards}
            showMenu={showMenu}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            toggleMenu={toggleMenu}
            withSignOut
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
