import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import DarkThemeIcon from '@/assets/icon-dark-theme.svg';
import LightThemeIcon from '@/assets/icon-light-theme.svg';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [checkboxActive, setCheckboxActive] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setCheckboxActive(!checkboxActive);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <div className='flex justify-center items-center gap-6 mx-3 py-3.5 bg-violet-50 dark:bg-zinc rounded-lg'>
      <LightThemeIcon
        className={`ease-in-out duration-1000 ${
          checkboxActive ? 'fill-yellow' : 'fill-slate'
        }`}
      />
      <div className='relative'>
        <input
          type='checkbox'
          id='toggle'
          className='hidden checkbox'
          onClick={() => handleClick()}
          checked={theme === 'dark'}
          readOnly
        />
        <label
          htmlFor='toggle'
          className='relative flex w-10 h-5 bg-violet-700 hover:bg-violet-400 border border-violet-700 rounded-full cursor-pointer theme-label transition'
        />
      </div>
      <DarkThemeIcon
        className={`ease-in-out duration-1000 ${
          checkboxActive ? 'fill-slate' : 'fill-blue'
        }`}
      />
    </div>
  );
};

export default ThemeSwitcher;
