import { useCallback, useState } from 'react';

import useStore from 'src/store/boardStore';
import Button from '@/components/Button';
import SidebarMobile from '@/components/Sidebar/SidebarMobile';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import LogoDark from '@/assets/logo-dark.svg';
import LogoLight from '@/assets/logo-light.svg';

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
    <header className='flex items-center h-16 md:h-20 lg:h-24 bg-white dark:bg-gunmetal-800'>
      <div
        className={`hidden md:flex items-center h-full border-r border-indigo dark:border-gunmetal-700 px-4 md:px-6 ${
          props.sidebarVisible && 'w-64'
        }`}
      >
        <span className='dark:hidden'>
          <LogoDark className='hidden md:block' />
        </span>
        <span className='hidden dark:inline'>
          <LogoLight className='hidden md:block' />
        </span>
      </div>
      <div className='flex flex-1 justify-between items-center w-full pl-4 md:pl-6 md:pr-2'>
        <SidebarMobile
          // TODO only needs names not all board data?
          boards={props.boards}
        />
        <h1 className='hidden md:block capitalize'>
          {store.selectedBoard?.boardName ?? 'No Boards'}
        </h1>
        <div className='flex items-center gap-1 md:gap-2.5'>
          <div>
            <Button
              variant='primary'
              size='lg'
              disabled={!store.selectedBoard?.columns.length}
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
