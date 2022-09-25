import { useForm, useFieldArray } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import Button from '../Button';
import PlusSign from '@/assets/icon-add-task-mobile.svg';
import CrossSign from '@/assets/icon-cross.svg';
import { trpc } from '@/utils/trpc';
import { CreateColumnInput } from '@/server/router/board';

const AddColumn = (props: {
  boardId: string;
  toggleAddColumnModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, error, isLoading } = trpc.useMutation(
    ['boards.add-columns'],
    {
      onSuccess: () => {
        props.toggleAddColumnModal();
        queryClient.invalidateQueries('boards.get-board-columns');
      },
    }
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateColumnInput>({
    defaultValues: {
      columns: [{ boardId: props.boardId, columnName: '' }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const onSubmit = (data: CreateColumnInput) => {
    mutate(data);
  };

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className=''>Add New Columns</h2>
        <span onClick={() => props.toggleAddColumnModal()}>
          <CrossSign />
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full'>
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
                <input
                  key={field.id}
                  {...register(`columns.${index}.columnName`, {
                    required: true,
                  })}
                  placeholder='e.g. Todo, Doing, Done'
                  className={`block w-full border border-slate/25 rounded-md p-4 ${
                    errors?.columns?.[index] && 'border-red-600'
                  }`}
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
          onClick={() => append({ boardId: props.boardId, columnName: '' })}
        >
          <PlusSign className='fill-violet-700' />
          <span>Add New Column</span>
        </Button>
        <Button type='submit' wide>
          <span>Create New Columns</span>
        </Button>
      </form>
    </div>
  );
};

export default AddColumn;
