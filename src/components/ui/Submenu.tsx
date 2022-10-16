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
          className='absolute flex flex-col gap-6 bg-white  p-4 rounded-xl top-12 right-4 w-48 shadow-2xl'
          ref={submenuRef}
        >
          <span
            className={`flex justify-between items-center text-slate cursor-pointer ${
              props.boards ? !props.boards?.length && 'hidden' : null
            }`}
            onClick={() => props.handleEdit()}
          >
            {`Edit ${props.boards ? 'Board' : 'Task'}`}
            <EditIcon className='fill-white stroke-slate w-6 h-6' />
          </span>
          <span
            className={`flex justify-between items-center text-red-600 cursor-pointer ${
              props.boards ? !props.boards?.length && 'hidden' : null
            }`}
            onClick={() => props.handleDelete()}
          >
            {`Delete ${props.boards ? 'Board' : 'Task'}`}
            <CrossIcon className='stroke-red-600 w-6 h-6' />
          </span>
          {props.withSignOut && (
            <span
              className='flex justify-between items-center text-red-600 cursor-pointer'
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              Sign Out
              <SignOutIcon className='fill-transparent stroke-red-600 w-6 h-6' />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Submenu;
