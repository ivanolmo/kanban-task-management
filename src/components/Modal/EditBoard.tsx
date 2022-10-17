import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '@/components/Button';
import CrossIcon from '@/assets/icon-cross.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';

import type { EditBoardInput } from '@/server/router/board';

const EditBoard = () => {
  const [columnsToDelete, setColumnsToDelete] = useState<string[]>([]);

  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(['boards.edit-board'], {
    onSuccess: () => {
      trpcCtx.invalidateQueries(['boards.get-boards']);
      store.toggleEditBoardModal();
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<EditBoardInput>({
    defaultValues: {
      id: store.selectedBoard?.id,
      boardName: store.selectedBoard?.boardName,
      columns: store.selectedBoard?.columns,
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const onSubmit = (data: EditBoardInput) => {
    const uniqueColumns = data.columns.filter(
      (column, index, self) =>
        index === self.findIndex((t) => t.columnName === column.columnName)
    );

    mutate({
      ...data,
      columns: uniqueColumns,
    });
  };

  useEffect(() => {
    reset(store.selectedBoard as EditBoardInput);
  }, [reset, store.selectedBoard]);

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className=''>Edit Board</h2>
        <button onClick={() => store.toggleEditBoardModal()}>
          <CrossIcon className='stroke-red-600 w-6 h-6' />
        </button>
      </div>
      {columnsToDelete.length > 0 && (
        <div className='space-y-4 text-body-lg text-red-600'>
          <span>
            <span className='uppercase'>Warning!</span> This action will delete
            the following column{columnsToDelete.length > 1 && 's'} and all
            associated tasks:
          </span>
          <ul>
            {columnsToDelete.map((column) => (
              <li key={column}>{column}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full'>
        <div className='relative flex flex-col gap-2'>
          <label
            htmlFor='boardName'
            className={`text-slate dark:text-white text-body-md ${
              errors.boardName && 'text-red-600'
            }`}
          >
            Board Name
          </label>
          <input
            {...register('boardName', { required: true, maxLength: 20 })}
            placeholder='e.g. Web Design'
            name='boardName'
            maxLength={20}
            className={`border-slate/25 ${
              errors?.boardName && 'border-red-600'
            }`}
          />
          {errors.boardName && errors.boardName.type === 'required' && (
            <span className='absolute top-10 right-4 text-red-600 text-body-sm'>
              Can&apos;t be empty
            </span>
          )}
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <span
            className={`text-slate dark:text-white text-body-md ${
              errors?.columns && 'text-red-600'
            }`}
          >
            Board Columns
          </span>
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className='relative flex items-center gap-2 w-full'
              >
                <input
                  key={field.id}
                  {...register(`columns.${index}.columnName`, {
                    required: true,
                  })}
                  disabled={field.columnName !== ''}
                  placeholder='e.g. Todo, Doing, Done'
                  className={`border-slate/25 ${
                    errors?.columns?.[index] && 'border-red-600'
                  }`}
                />
                <button
                  type='button'
                  onClick={() => {
                    remove(index);
                    setColumnsToDelete((columns) => [
                      ...columns,
                      field.columnName,
                    ]);
                  }}
                >
                  <CrossIcon className='stroke-red-600 w-6 h-6' />
                </button>
                {errors?.columns?.[index] && (
                  <span className='absolute top-4 right-10 text-red-600 text-body-sm'>
                    Can&apos;t be empty
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Button
          variant='secondary'
          wide
          onClick={() => append({ columnName: '' })}
        >
          <PlusIcon className='fill-violet-700' />
          <span>Add New Column</span>
        </Button>
        <Button type='submit' wide>
          <span>Save Changes</span>
        </Button>
      </form>
    </div>
  );
};

export default EditBoard;
