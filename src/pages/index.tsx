import { useState } from 'react';
import type { NextPage } from 'next';
import ScrollContainer from 'react-indiana-drag-scroll';

import Button from '@/components/Button';
import SidebarComp from '@/components/Sidebar/SidebarComp';
import PlusSign from '@/assets/icon-add-task-mobile.svg';
import ShowSidebar from '@/assets/icon-show-sidebar.svg';
import ColumnComp from '@/components/Column/ColumnComp';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  // const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // temp state
  const [boardExists, setBoardExists] = useState(null);
  const [boardButNoData, setBoardButNoData] = useState(null);
  // const [data, setData] = useState(false);

  return (
    <main className='relative'>
      <div className='flex min-h-screen relative'>
        {/* <div className='flex min-h-screen'> */}
        {/* sidebar will be toggled by button */}
        <div
          className={`ease-in-out duration-300 absolute left-0 ${
            sidebarVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarComp />
        </div>
        {/* column container if column(s) */}
        {/* <ScrollContainer
          className={`flex gap-6 px-4 md:px-6 py-6 ease-in-out duration-300 ${
            sidebarVisible ? 'ml-64' : 'ml-0'
          }`}
          buttons={[0, 1]}
          vertical={true}
        >
          <ColumnComp />
          <ColumnComp />
          <ColumnComp />
        </ScrollContainer> */}
        {/* views with a no data condition */}
        {true && (
          <section className='flex flex-col items-center gap-6 flex-1 max-w-xs m-auto'>
            {/* no boards exist */}
            {boardExists ?? (
              <>
                <h2 className='text-center text-slate'>
                  You haven&apos;t created any boards yet. Add one below to get
                  started!
                </h2>
                <Button
                  variant='primary'
                  size='rg'
                  // temp onClick to close sidebar
                  onClick={() => setSidebarVisible(!sidebarVisible)}
                >
                  <PlusSign />
                  <span>Create New Board</span>
                </Button>
              </>
            )}
            {/* existing board but no columns */}
            {!boardButNoData ?? (
              <>
                <h2 className='text-center text-slate'>
                  This board is empty. Create a new column to get started.
                </h2>
                <Button variant='primary' size='rg'>
                  <PlusSign />
                  <span>Add New Column</span>
                </Button>
              </>
            )}
          </section>
        )}
      </div>
      {/* toggle sidebar button */}
      <div
        className={`hidden absolute left-0 bottom-8 md:flex justify-center items-center bg-violet-700 p-5 rounded-r-full cursor-pointer ease-in-out duration-300 ${
          sidebarVisible ? '-translate-x-full' : 'translate-x-0'
        }`}
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        <ShowSidebar className='' />
      </div>
    </main>
  );
};

export default Home;
