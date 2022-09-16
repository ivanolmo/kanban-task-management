import Button from './Button';

const Header = () => {
  return (
    <header className='flex items-center justify-between h-16 px-4 py-5 bg-white'>
      <div className='flex items-center gap-4'>
        <div>
          <svg width='24' height='25' xmlns='http://www.w3.org/2000/svg'>
            <g fill='#635FC7' fillRule='evenodd'>
              <rect width='6' height='25' rx='2' />
              <rect opacity='.75' x='9' width='6' height='25' rx='2' />
              <rect opacity='.5' x='18' width='6' height='25' rx='2' />
            </g>
          </svg>
        </div>
        <div className='flex items-center hidden gap-2'>
          {/* will be hidden if no boards yet, visible with at least one board */}
          {/* board name shows here on all views. also shows dropdown button to expand boards but only on mobile view */}
          {/* button to expand boards is not here on md and lg screens, it's on sidebar */}
          {/* <h2>Platform Launch</h2>
          <div className='mt-1 cursor-pointer'>
            <svg width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
              <path
                stroke='#635FC7'
                strokeWidth='2'
                fill='none'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </div> */}
        </div>
      </div>
      {/* add new task and open sub-menu buttons. will be hidden if no boards, visible but disabled if board has no columns */}
      <div className='flex items-center hidden gap-4'>
        <Button variant='primary' size='rg' disabled={true}>
          <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill='#FFF'
              d='M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z'
            />
          </svg>
        </Button>
        <div className='cursor-pointer'>
          <svg width='5' height='20' xmlns='http://www.w3.org/2000/svg'>
            <g fill='#828FA3' fillRule='evenodd'>
              <circle cx='2.308' cy='2.308' r='2.308' />
              <circle cx='2.308' cy='10' r='2.308' />
              <circle cx='2.308' cy='17.692' r='2.308' />
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
