import { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import type { FieldValues, UseFormSetValue } from 'react-hook-form';
import clsx from 'clsx';

import useStore from 'src/store/boardStore';
import ChevronDownIcon from '@/assets/icon-chevron-down.svg';
import CheckIcon from '@/assets/icon-check.svg';

type SelectProps = {
  field: FieldValues;
  handleColumnMove?: (columnId: string) => void;
};

const Select = (props: SelectProps): JSX.Element => {
  const store = useStore();
  console.log('props select -> ', props);
  const { onChange, value } = props.field;
  const { handleColumnMove } = props;

  // set default select value to todo if new task, else set to current column
  console.log('store.selectedTask ', store.selectedTask);
  useEffect(() => {
    if (!store.selectedTask) {
      // set select value if new task
      console.log('useeffect first');
    } else {
      // set select value if existing task
      console.log('useeffect second');
    }
  }, [store.selectedBoard?.columns, store.selectedTask]);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className='relative'>
          <Listbox.Button className='relative w-full border border-slate/25 rounded-md px-4 py-2 text-left text-body-lg cursor-pointer'>
            <span>
              {value.columnName ?? store.selectedBoard?.columns[0]?.columnName}
            </span>
            <span
              className={clsx(
                'cursor-pointer absolute right-4 top-4 transition',
                open && 'rotate-180'
              )}
            >
              <ChevronDownIcon className='stroke-violet-700' />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in-out duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute w-full overflow-auto rounded-md bg-white dark:bg-zinc text-body-lg shadow-xl'>
              {store.selectedBoard?.columns.map((column) => (
                <Listbox.Option
                  key={column.id}
                  className={({ active }) =>
                    clsx(
                      'relative group px-4 py-2 cursor-pointer',
                      active ? 'bg-violet-700 text-white' : 'text-slate',
                      value.columnName === column.columnName
                        ? 'bg-violet-700 text-white'
                        : 'text-slate'
                    )
                  }
                  value={{
                    id: column.id,
                    columnName: column.columnName,
                  }}
                >
                  {() => (
                    <>
                      <span
                        className={clsx(
                          'block',
                          value.columnName === column.columnName
                            ? 'font-bold'
                            : 'font-normal'
                        )}
                      >
                        {column.columnName}
                      </span>
                      {value.columnName === column.columnName && (
                        <span className='absolute right-4 top-4 stroke-white'>
                          <CheckIcon />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
