import { useState } from 'react';

import DarkThemeIcon from '@/assets/icon-dark-theme.svg';
import LightThemeIcon from '@/assets/icon-light-theme.svg';

const ThemeSwitcher = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleClick = () => setCheckboxChecked(!checkboxChecked);

  return (
    <div className='flex justify-center items-center gap-6 mx-3 py-3.5 bg-violet-50 rounded-lg'>
      <LightThemeIcon
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
      <DarkThemeIcon
        className={`ease-in-out duration-700 ${
          checkboxChecked ? 'fill-blue' : 'fill-slate'
        }`}
      />
    </div>
  );
};

export default ThemeSwitcher;
