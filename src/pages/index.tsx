import type { NextPage } from 'next';
import Button from '../components/Button';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  // const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen px-8'>
        {/* default view with no data */}
        <section className='flex flex-col items-center gap-6'>
          {/* no boards exist */}
          <h2 className='text-center text-slate'>
            You haven&apos;t created any boards yet. Add one below to get
            started!
          </h2>
          <Button variant='primary' size='rg'>
            <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill='#FFF'
                d='M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z'
              />
            </svg>
            <span>Create New Board</span>
          </Button>
          {/* existing board but no columns */}
          {/* <h2 className='text-center text-slate'>
            This board is empty. Create a new column to get started.
          </h2>
          <Button variant='primary' size='rg'>
            <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill='#FFF'
                d='M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z'
              />
            </svg>
            <span>Add New Column</span>
          </Button> */}
        </section>
      </main>
    </>
  );
};

export default Home;
