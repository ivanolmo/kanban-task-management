import { useState } from 'react';

import SidebarItem from '@/components/Sidebar/SidebarItem';
import LightTheme from '@/assets/icon-light-theme.svg';
import DarkTheme from '@/assets/icon-dark-theme.svg';
import HideSidebar from '@/assets/icon-hide-sidebar.svg';

const SidebarComp = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleClick = () => setCheckboxChecked(!checkboxChecked);

  return (
    <aside
      className='!w-64 hidden md:block flex-shrink-0 z-10'
      aria-label='Sidebar'
    >
      <div className='flex flex-col justify-between text-slate bg-white border-r border-indigo h-screen py-8'>
        <div>
          <h4 className='uppercase ml-6'>All Boards (3)</h4>
          <ul className='mt-5'>
            {/* this will be a mapped array */}
            <SidebarItem />
            <SidebarItem />
            <SidebarItem />
          </ul>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-center items-center gap-6 mx-3 py-3.5 bg-violet-50 rounded-lg'>
            <LightTheme
              className={`ease-in-out duration-700 ${
                checkboxChecked ? 'fill-slate' : 'fill-yellow'
              }`}
            />
            {/* theme switcher */}
            <div className='relative'>
              <input
                type='checkbox'
                id='toggle'
                className='hidden checkbox'
                onClick={() => handleClick()}
                checked={checkboxChecked}
                readOnly
              />
              <label
                htmlFor='toggle'
                className='relative flex w-10 h-5 bg-violet-700 border border-violet-700 rounded-full cursor-pointer theme-label'
              />
            </div>
            <DarkTheme
              className={`ease-in-out duration-700 ${
                checkboxChecked ? 'fill-blue' : 'fill-slate'
              }`}
            />
          </div>
          {/* button will close sidebar */}
          <div
            className='flex items-center gap-3 mx-3 py-3.5 px-4 rounded-lg cursor-pointer group'
            onClick={() => console.log('hide sidebar')}
          >
            <HideSidebar className='fill-slate group-hover:fill-gunmetal-700' />
            <span className='text-slate group-hover:text-gunmetal-700'>
              Hide Sidebar
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarComp;
