import { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';

import CrossIcon from '@/assets/icon-cross.svg';
import EditIcon from '@/assets/icon-edit.svg';
import ThreeDotsIcon from '@/assets/icon-vertical-ellipsis.svg';
import SignOutIcon from '@/assets/icon-sign-out.svg';

import type { Board } from 'src/types/boardTypes';

type SubmenuProps = {
  boards?: Board[] | undefined;
  showMenu: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
  toggleMenu: () => void;
  withSignOut?: boolean;
};

const Submenu = (props: SubmenuProps) => {
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const { toggleMenu } = props;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        submenuRef.current &&
        buttonRef.current &&
        !submenuRef.current.contains(e.target as Node) &&
        !buttonRef?.current?.contains(e.target as Node)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenu]);

  return (
    <div
      className='relative px-4 cursor-pointer'
      onClick={() => props.toggleMenu()}
    >
      <div ref={buttonRef}>
        <ThreeDotsIcon
          className={`transition ${props.showMenu && 'rotate-90'}`}
        />
      </div>
      {props.showMenu && (
        <div
          className='absolute flex flex-col gap-6 bg-white dark:bg-zinc p-4 rounded-xl top-12 right-0 lg:right-1 w-48 shadow-x'
          ref={submenuRef}
        >
          <span
            className={`flex justify-between items-center text-slate hover:text-gunmetal-700 dark:hover:text-white cursor-pointer group transition ${
              props.boards ? !props.boards?.length && 'hidden' : null
            }`}
            onClick={() => props.handleEdit()}
          >
            {`Edit ${props.boards ? 'Board' : 'Task'}`}
            <EditIcon className='fill-white dark:fill-transparent stroke-slate group-hover:stroke-gunmetal-700 dark:group-hover:stroke-white w-6 h-6 transition' />
          </span>
          <span
            className={`flex justify-between items-center text-red-600 hover:text-red-900 dark:hover:text-red-400 cursor-pointer group transition ${
              props.boards ? !props.boards?.length && 'hidden' : null
            }`}
            onClick={() => props.handleDelete()}
          >
            {`Delete ${props.boards ? 'Board' : 'Task'}`}
            <CrossIcon className='stroke-red-600 group-hover:stroke-red-900 dark:group-hover:stroke-red-400 w-6 h-6 transition' />
          </span>
          {props.withSignOut && (
            <span
              className='flex justify-between items-center text-red-600 hover:text-red-900 dark:hover:text-red-400 cursor-pointer group transition'
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              Sign Out
              <SignOutIcon className='fill-transparent stroke-red-600 group-hover:stroke-red-900 dark:group-hover:stroke-red-400 w-6 h-6 transition' />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Submenu;
