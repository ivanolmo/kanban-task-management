import { useForm, useFieldArray, Controller } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '@/components/Button';
import Select from '@/components/ui/Select';
import CrossIcon from '@/assets/icon-cross.svg';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';

import type { EditTaskInput } from '@/server/router/task';
import { useEffect } from 'react';

const EditTask: React.FC = () => {
  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(['tasks.edit-task'], {
    onSuccess: () => {
      trpcCtx.invalidateQueries(['boards.get-boards']);
      store.clearSelectedTask();
      store.toggleEditTaskModal();
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<EditTaskInput>({
    defaultValues: {
      id: store.selectedTask?.id,
      columnId: { id: store.selectedTask?.columnId },
      title: store.selectedTask?.title,
      description: store.selectedTask?.description,
      subtasks: store.selectedTask?.subtasks,
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });

  const onSubmit = (data: EditTaskInput) => {
    const uniqueSubtasks = data.subtasks.filter(
      (subtask, index, self) =>
        index === self.findIndex((t) => t.title === subtask.title)
    );

    mutate({
      ...data,
      subtasks: uniqueSubtasks,
    });
  };

  const handleClose = () => {
    store.toggleEditTaskModal();
    store.clearSelectedTask();
  };

  useEffect(() => {
    reset({
      id: store.selectedTask?.id,
      columnId: { id: store.selectedTask?.columnId },
      title: store.selectedTask?.title,
      description: store.selectedTask?.description,
      subtasks: store.selectedTask?.subtasks,
    });
  }, [reset, store.selectedTask]);

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className=''>Edit Task</h2>
        <button onClick={() => handleClose()}>
          <CrossIcon className='stroke-red-600 w-6 h-6' />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full'>
        <div className='relative flex flex-col gap-2'>
          <label
            htmlFor='title'
            className={`text-slate dark:text-white text-body-md ${
              errors.title && 'text-red-600'
            }`}
          >
            Title
          </label>
          <input
            {...register('title', { required: true })}
            placeholder='e.g. Take coffee break'
            name='title'
            className={`border-slate/25 ${errors?.title && 'border-red-600'}`}
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
            className={`text-slate dark:text-white text-body-md ${
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
            className={`border-slate/25 ${
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
            className={`text-slate dark:text-white text-body-md ${
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
                      className={`border-slate/25 ${
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
            className={`text-slate dark:text-white text-body-md ${
              errors?.columnId && 'text-red-600'
            }`}
          >
            Status
          </span>
          <Select control={control} name='columnId' />
          <Button type='submit' wide>
            <span>Save Changes</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
