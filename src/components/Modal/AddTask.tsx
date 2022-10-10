import { useForm, useFieldArray, Controller } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '../Button';
import CrossIcon from '@/assets/icon-cross.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';
import Select from '@/components/ui/Select';

import type { CreateTaskInput } from '@/server/router/task';

const AddTask: React.FC = () => {
  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(['tasks.add-task'], {
    onSuccess: () => {
      trpcCtx.invalidateQueries(['boards.get-boards']);
      store.toggleAddTaskModal();
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    defaultValues: {
      // nope
      columnId: {},
      title: '',
      description: '',
      subtasks: [{ title: '' }, { title: '' }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });

  const onSubmit = (data: CreateTaskInput) => {
    // remove subtasks with no name
    data = {
      ...data,
      columnId: { id: data.columnId.id },
      subtasks: data.subtasks.filter((subtask) => subtask.title !== ''),
    };

    mutate(data);
  };

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className=''>Add New Task</h2>
        <button onClick={() => store.toggleAddTaskModal()}>
          <CrossIcon className='stroke-red-600 w-6 h-6' />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full'>
        <div className='relative flex flex-col gap-2'>
          <label
            htmlFor='title'
            className={`text-slate text-body-md ${
              errors.title && 'text-red-600'
            }`}
          >
            Title
          </label>
          <input
            {...register('title', { required: true, maxLength: 20 })}
            placeholder='e.g. Take coffee break'
            name='title'
            maxLength={20}
            className={`block w-full border border-slate/25 rounded-md px-4 py-2 ${
              errors?.title && 'border-red-600'
            }`}
          />
          {errors.title && errors.title.type === 'required' && (
            <span className='absolute top-8 right-4 text-red-600 text-body-lg'>
              Can&apos;t be empty
            </span>
          )}
        </div>
        <div className='relative flex flex-col gap-2'>
          <label
            htmlFor='description'
            className={`text-slate text-body-md ${
              errors.description && 'text-red-600'
            }`}
          >
            Description
          </label>
          <textarea
            {...register('description', {
              required: true,
            })}
            name='description'
            placeholder="e.g. It's always good to take a break. This 15 minute break will rechage the batteries a little."
            className={`w-full border border-slate/25 rounded-md px-4 py-2 resize-none h-28 ${
              errors?.description && 'border-red-600'
            }`}
          ></textarea>
          {errors.description && errors.description.type === 'required' && (
            <span className='absolute bottom-2 right-4 text-red-600 text-body-lg'>
              Can&apos;t be empty
            </span>
          )}
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <span
            className={`text-slate text-body-md ${
              errors?.subtasks && 'text-red-600'
            }`}
          >
            Subtasks
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
                      placeholder={
                        index === 0
                          ? 'e.g. Make coffee'
                          : index % 2 === 0
                          ? 'e.g. Make more coffee!'
                          : 'e.g. Drink coffee and feel happy'
                      }
                      className={`block w-full border border-slate/25 rounded-md px-4 py-2 ${
                        errors?.subtasks?.[index] && 'border-red-600'
                      }`}
                    />
                  )}
                  name={`subtasks.${index}.title`}
                  control={control}
                  rules={{ required: true }}
                  defaultValue={field.id}
                />
                <button type='button' onClick={() => remove(index)}>
                  <CrossIcon className='stroke-red-600 w-6 h-6' />
                </button>
                {errors?.subtasks?.[index] && (
                  <span className='absolute top-2 right-12 text-red-600 text-body-lg'>
                    Can&apos;t be empty
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Button variant='secondary' wide onClick={() => append({ title: '' })}>
          <PlusIcon className='fill-violet-700' />
          <span>Add New Subtask</span>
        </Button>
        <div className='flex flex-col gap-4 w-full'>
          <span
            className={`text-slate text-body-md ${
              errors?.columnId && 'text-red-600'
            }`}
          >
            Status
          </span>
          <Controller
            name='columnId'
            control={control}
            render={({ field }) => <Select field={field} />}
          />
          <Button type='submit' wide>
            <span>Create Task</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
