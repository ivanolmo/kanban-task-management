import Button from '@/components/Button';
import LogoDark from '@/assets/logo-dark.svg';
import LogoMobile from '@/assets/logo-mobile.svg';
import ChevronDown from '@/assets/icon-chevron-down.svg';
import PlusSign from '@/assets/icon-add-task-mobile.svg';
import ThreeDots from '@/assets/icon-vertical-ellipsis.svg';

const Header = () => {
  return (
    <header className='flex items-center h-16 bg-white'>
      {/* md/lg header view with big logo and sidebar */}
      {/* w-64 when sidebar is open */}
      <div className='hidden md:flex items-center h-full border-r border-indigo px-4 md:px-6'>
        <LogoDark className='hidden md:block' />
      </div>
      {/* add new task and open sub-menu buttons. will be hidden if no boards, visible but disabled if board has no columns */}
      <div className='flex flex-1 justify-between items-center w-full px-4 md:px-6'>
        <div className='flex items-center gap-4'>
          {/* will be hidden if no boards yet, visible with at least one board */}
          {/* board name shows here on all views. also shows dropdown button to expand boards but only on mobile view */}
          {/* button to expand boards is not here on md and lg screens, it's on sidebar */}
          <LogoMobile className='md:hidden' />
          {/* board name and toggle boards button. hidden or maybe "No Boards" msg when none exist */}
          <div className='flex items-center gap-2 hidden'>
            <h2>Platform Launch</h2>
            <div className='mt-1 cursor-pointer'>
              <ChevronDown />
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4 md:gap-6'>
          {/* add task button */}
          {/* conditional disabled state based on presence of a board to add tasks to */}
          <Button variant='primary' size='rg' disabled={true}>
            <PlusSign />
            <span className='hidden md:inline'>Add New Task</span>
          </Button>
          {/* if button is disabled, this sub-menu button will also be disabled */}
          <div className='cursor-pointer opacity-25 cursor-not-allowed'>
            <ThreeDots />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
