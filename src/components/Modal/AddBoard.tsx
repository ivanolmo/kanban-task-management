import { useForm, useFieldArray, Controller } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '../Button';
import CrossIcon from '@/assets/icon-cross.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';

import type { CreateBoardInput } from '@/server/router/board';

const AddBoard = () => {
  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(
    ['boards.create-board'],
    {
      onSuccess: () => {
        trpcCtx.invalidateQueries(['boards.get-boards']);
        store.toggleAddBoardModal();
      },
    }
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateBoardInput>({
    defaultValues: {
      boardName: '',
      columns: [{ columnName: 'Todo' }, { columnName: 'Doing' }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const onSubmit = (data: CreateBoardInput) => {
    // remove columns with no name
    data = {
      ...data,
      columns: data.columns.filter((column) => column.columnName !== ''),
    };

    mutate(data);
  };

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className=''>Add New Board</h2>
        <span
          className='cursor-pointer'
          onClick={() => store.toggleAddBoardModal()}
        >
          <CrossIcon className='stroke-red-600 w-6 h-6' />
        </span>
      </div>
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
                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='e.g. Todo, Doing, Done'
                      className={`border-slate/25 ${
                        errors?.columns?.[index] && 'border-red-600'
                      }`}
                    />
                  )}
                  name={`columns.${index}.columnName`}
                  control={control}
                  // rules={{ required: true }}
                  defaultValue={field.id}
                />
                <button type='button' onClick={() => remove(index)}>
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
          <span>Create New Board</span>
        </Button>
      </form>
    </div>
  );
};

export default AddBoard;
