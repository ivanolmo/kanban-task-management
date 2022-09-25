import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import Button from '../Button';
import CrossSign from '@/assets/icon-cross.svg';
import PlusSign from '@/assets/icon-add-task-mobile.svg';
import { trpc } from '@/utils/trpc';
import { CreateBoardInput } from '@/server/router/board';

const AddBoard = (props: { toggleAddBoardModal: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate, error, isLoading } = trpc.useMutation(
    ['boards.create-board'],
    {
      onSuccess: () => {
        props.toggleAddBoardModal();
        queryClient.invalidateQueries('boards.get-boards');
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
      columns: [],
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
      boardName: data.boardName,
      columns: data.columns.filter((column) => column.columnName !== ''),
    };

    mutate(data);
  };

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className=''>Add New Board</h2>
        <span onClick={() => props.toggleAddBoardModal()}>
          <CrossSign />
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full'>
        <div className='relative flex flex-col gap-2'>
          <label
            htmlFor='boardName'
            className={`text-slate text-body-md ${
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
            className={`block w-full border border-slate/25 rounded-md p-4 ${
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
            className={`text-slate text-body-md ${
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
                      className={`block w-full border border-slate/25 rounded-md p-4 ${
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
                  <CrossSign />
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
          <PlusSign className='fill-violet-700' />
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