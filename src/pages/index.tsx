import { useEffect, useState } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import ScrollContainer from 'react-indiana-drag-scroll';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '@/components/Button';
import ColumnComp from '@/components/Column/ColumnComp';
import Header from '@/components/Layout/Header';
import AddBoard from '@/components/Modal/AddBoard';
import DeleteBoard from '@/components/Modal/DeleteBoard';
import EditBoard from '@/components/Modal/EditBoard';
import ModalContainer from '@/components/Modal/ModalContainer';
import SidebarComp from '@/components/Sidebar/SidebarComp';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import ShowSidebarIcon from '@/assets/icon-show-sidebar.svg';
import { getKanbanServerAuthSession } from '@/server/common/get-server-session';

import type { Board, Column } from 'src/types/boardTypes';

const Home: NextPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const session = useSession();
  const store = useStore();

  // TODO check refetch after mutate
  const {
    data: boards,
    isLoading,
    isError,
    isSuccess,
  } = trpc.useQuery(['boards.get-boards'], {
    enabled: !!session?.data?.user,
    // refetchOnWindowFocus: false,
    onSuccess: (data) => {
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
        <div className='place-self-center flex flex-col items-center gap-8'>
          <span>You must be signed in to use this application!</span>
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
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
          </ScrollContainer>
          <section className='flex flex-col items-center gap-6 flex-1 max-w-xs m-auto'>
            {boards?.length === 0 && (
              <>
                <h2 className='text-center text-slate'>
                  You haven&apos;t created any boards yet. Add one below to get
                  started!
                </h2>
                <Button
                  variant='primary'
                  size='rg'
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
                  size='rg'
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
          className={`hidden absolute left-0 bottom-8 md:flex justify-center items-center bg-violet-700 p-5 rounded-r-full cursor-pointer ease-in-out duration-300 ${
            sidebarVisible ? '-translate-x-full' : 'translate-x-0'
          }`}
          onClick={() => toggleSidebar()}
        >
          <ShowSidebarIcon className='' />
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
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getKanbanServerAuthSession(ctx),
    },
  };
};
