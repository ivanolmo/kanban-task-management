import { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';

import type { FieldPath, FieldValues } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import ChevronDownIcon from '@/assets/icon-chevron-down.svg';
import CheckIcon from '@/assets/icon-check.svg';

import type { SelectProps } from 'src/types/boardTypes';

const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: SelectProps<TFieldValues, TName>
): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController(props);

  const store = useStore();

  const { handleColumnMove } = props;

  // on mount set default select value to todo if new task, or current column if viewing task
  useEffect(() => {
    if (!store.selectedTask) {
      onChange(store.selectedBoard?.columns[0]);
    } else {
      onChange(
        store.selectedBoard?.columns.find(
          (column) => column.id === store.selectedTask?.columnId
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.selectedBoard?.columns, store.selectedTask]);

  // this fires if existing task and user changes column
  useEffect(() => {
    if (
      store.selectedTask &&
      !store.showEditTaskModal &&
      Object.keys(value).length &&
      value.id !== store.selectedTask?.columnId
    ) {
      handleColumnMove &&
        handleColumnMove(value.id, store.selectedTask?.id as string);
      store.toggleViewTaskModal();
    }
  }, [handleColumnMove, store, value]);

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
              {store.selectedBoard?.columns.map((column) => {
                return (
                  <Listbox.Option
                    key={column.id}
                    className={({ active }) =>
                      clsx(
                        'relative group px-4 py-2 cursor-pointer',
                        active ? 'bg-violet-700 text-white' : 'text-slate',
                        value.id === column.id
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
                            value.id === column.id ? 'font-bold' : 'font-normal'
                          )}
                        >
                          {column.columnName}
                        </span>
                        {value.id === column.id && (
                          <span className='absolute right-4 top-4 stroke-white'>
                            <CheckIcon />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
