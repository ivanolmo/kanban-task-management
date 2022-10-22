import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import ScrollContainer from 'react-indiana-drag-scroll';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '@/components/Button';
import AddColumn from '@/components/Column/AddColumn';
import ColumnComp from '@/components/Column/ColumnComp';
import Header from '@/components/Layout/Header';
import AddBoard from '@/components/Modal/AddBoard';
import AddTask from '@/components/Modal/AddTask';
import DeleteBoard from '@/components/Modal/DeleteBoard';
import EditBoard from '@/components/Modal/EditBoard';
import ModalContainer from '@/components/Modal/ModalContainer';
import DeleteTask from '@/components/Modal/DeleteTask';
import ViewTask from '@/components/Modal/ViewTask';
import SidebarComp from '@/components/Sidebar/SidebarComp';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import ShowSidebarIcon from '@/assets/icon-show-sidebar.svg';

import type { Board, Column } from 'src/types/boardTypes';
import EditTask from '@/components/Modal/EditTask';

const Home: NextPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const session = useSession();
  const store = useStore();

  const {
    data: boards,
    isLoading,
    isError,
  } = trpc.useQuery(['boards.get-boards'], {
    enabled: !!session?.data?.user,
    refetchOnWindowFocus: false,
    onSuccess: (data: Board[]) => {
      store.setSelectedBoard(data[0] as Board);
    },
  });

  // closes md+ sidebar on window resize to mobile
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      if (isMobile) {
        setSidebarVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  if (!session.data) {
    return (
      <div className='grid h-screen'>
        <div className='place-self-center flex flex-col items-center gap-16'>
          <div>
            <Image
              src='/assets/logo-main.webp'
              alt='logo'
              width={192}
              height={192}
              priority
            />
          </div>
          <div className='flex flex-col items-center gap-6'>
            <span>You must be signed in to use this application!</span>
            <Button onClick={() => signIn()}>Sign in</Button>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Header boards={boards} sidebarVisible={sidebarVisible} />
      <main className=''>
        <div className='flex h-screen'>
          <div
            className={`ease-in-out duration-300 absolute left-0 ${
              sidebarVisible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <SidebarComp boards={boards} toggleSidebar={toggleSidebar} />
          </div>
          <ScrollContainer
            className={`flex gap-6 px-4 md:px-6 py-6 ease-in-out duration-300 ${
              sidebarVisible ? 'ml-64' : 'ml-0'
            }`}
            buttons={[0, 1]}
            vertical={true}
          >
            {store.selectedBoard?.columns?.map((column: Column) => (
              <ColumnComp key={column.id} column={column} />
            ))}
            {store.selectedBoard &&
              store.selectedBoard?.columns?.length > 0 && <AddColumn />}
          </ScrollContainer>
          <section className='flex flex-col items-center gap-6 flex-1 max-w-xs lg:max-w-lg m-auto'>
            {boards?.length === 0 && (
              <>
                <h2 className='text-center text-slate'>
                  You haven&apos;t created any boards yet. Add one below to get
                  started!
                </h2>
                <Button
                  variant='primary'
                  size='lg'
                  onClick={() => store.toggleAddBoardModal()}
                >
                  <PlusIcon className='fill-white' />
                  <span>Create New Board</span>
                </Button>
              </>
            )}
            {store.selectedBoard?.columns?.length === 0 && (
              <>
                <h2 className='text-center text-slate'>
                  This board is empty. Create a new column to get started!
                </h2>
                <Button
                  variant='primary'
                  size='lg'
                  onClick={() => store.toggleEditBoardModal()}
                >
                  <PlusIcon className='fill-white' />
                  <span>Add New Column</span>
                </Button>
              </>
            )}
          </section>
        </div>
        <div
          className={`hidden absolute left-0 bottom-8 md:flex justify-center items-center bg-violet-700 hover:bg-violet-400 p-5 rounded-r-full cursor-pointer transition ${
            sidebarVisible ? '-translate-x-full' : 'translate-x-0'
          }`}
          onClick={() => toggleSidebar()}
        >
          <ShowSidebarIcon />
        </div>
        {store.showAddBoardModal && (
          <ModalContainer>
            <AddBoard />
          </ModalContainer>
        )}
        {store.showDeleteBoardModal && (
          <ModalContainer>
            <DeleteBoard />
          </ModalContainer>
        )}
        {store.showEditBoardModal && (
          <ModalContainer>
            <EditBoard />
          </ModalContainer>
        )}
        {store.showAddTaskModal && (
          <ModalContainer>
            <AddTask />
          </ModalContainer>
        )}
        {store.showViewTaskModal && (
          <ModalContainer>
            <ViewTask />
          </ModalContainer>
        )}
        {store.showDeleteTaskModal && (
          <ModalContainer>
            <DeleteTask />
          </ModalContainer>
        )}
        {store.showEditTaskModal && (
          <ModalContainer>
            <EditTask />
          </ModalContainer>
        )}
      </main>
    </>
  );
};

export default Home;
