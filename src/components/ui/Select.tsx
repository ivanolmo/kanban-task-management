import { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import type { FieldValues } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import ChevronDownIcon from '@/assets/icon-chevron-down.svg';
import CheckIcon from '@/assets/icon-check.svg';

const Select = (props: { field: FieldValues }) => {
  const store = useStore();

  const { onChange, value } = props.field;

  // set default select value to todo
  useEffect(() => {
    onChange(store.selectedBoard?.columns[0]);
  }, [onChange, store.selectedBoard?.columns]);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative'>
        <Listbox.Button className='relative w-full cursor-default border border-slate/25 rounded-md px-4 py-2 text-left text-body-lg'>
          <span>
            {value.columnName ?? store.selectedBoard?.columns[0]?.columnName}
          </span>
          <span className='cursor-pointer absolute right-4 top-4'>
            <ChevronDownIcon className='stroke-violet-700' />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute w-full overflow-auto rounded-md bg-white text-body-lg shadow-xl'>
            {store.selectedBoard?.columns.map((column) => (
              <Listbox.Option
                key={column.id}
                className={({ active }) =>
                  `relative group px-4 py-2 cursor-pointer ${
                    active ? 'bg-violet-700 text-white' : 'text-slate'
                  }`
                }
                value={{
                  id: column.id,
                  columnName: column.columnName,
                }}
              >
                {() => (
                  <>
                    <span
                      className={`block ${
                        value.columnName === column.columnName
                          ? 'font-bold'
                          : 'font-normal'
                      }`}
                    >
                      {column.columnName}
                    </span>
                    {value.columnName === column.columnName && (
                      <span className='absolute right-4 top-4 stroke-violet-700 group-hover:stroke-white'>
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
    </Listbox>
  );
};

export default Select;
