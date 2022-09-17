import { useState } from 'react';
import type { NextPage } from 'next';

import Button from '@/components/Button';
import Sidebar from '@/components/Sidebar';
import PlusSign from '@/assets/icon-add-task-mobile.svg';
import ShowSidebar from '@/assets/icon-show-sidebar.svg';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  // const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <main className='relative'>
      <div className='flex items-center min-h-screen'>
        {/* sidebar will be toggled by button */}
        {sidebarVisible && <Sidebar />}
        {/* default view with no data */}
        <section className='flex flex-col items-center gap-6 flex-1'>
          {/* no boards exist */}
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
          {/* existing board but no columns */}
          {/* <h2 className='text-center text-slate'>
            This board is empty. Create a new column to get started.
          </h2>
          <Button variant='primary' size='rg'>
            <PlusSign />
            <span>Add New Column</span>
          </Button> */}
        </section>
      </div>
      <div className='absolute left-0 bottom-8'>
        <div
          className='flex justify-center items-center bg-violet-700 p-5 rounded-r-full cursor-pointer'
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          <ShowSidebar className='' />
        </div>
      </div>
    </main>
  );
};

export default Home;
