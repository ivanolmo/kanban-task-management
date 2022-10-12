import { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Select from '@/components/ui/Select';
import Submenu from '@/components/ui/Submenu';
import CheckIcon from '@/assets/icon-check.svg';

const ViewTask: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const store = useStore();
  const trpcCtx = trpc.useContext();

  const completedSubtasks = store.selectedTask?.subtasks?.filter(
    (subtask: { completed: boolean }) => subtask.completed === true
  ).length;

  const { mutate, error, isLoading } = trpc.useMutation(['tasks.add-task'], {
    onSuccess: () => {
      trpcCtx.invalidateQueries(['boards.get-boards']);
      store.toggleAddTaskModal();
    },
  });

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center gap-4 w-full'>
        <h2 className=''>{store.selectedTask?.title}</h2>
        <Submenu
          showMenu={showMenu}
          handleDelete={() => console.log('delete')}
          handleEdit={() => console.log('edit')}
          toggleMenu={toggleMenu}
        />
      </div>
      <form
        onSubmit={() => console.log('view submit')}
        className='space-y-6 w-full'
      >
        <div className='flex flex-col gap-2'>
          <p className='text-slate text-body-lg'>
            {store.selectedTask?.description}
          </p>
        </div>

        <div className='relative flex flex-col gap-2'>
          <span className='text-slate text-body-md'>{`Subtasks (${completedSubtasks} of ${store.selectedTask?.subtasks?.length})`}</span>
        </div>

        <ul className='flex flex-col gap-4 w-full'>
          {store.selectedTask?.subtasks?.map((subtask, index) => (
            <li
              className='pl-3 pr-6 py-4 bg-violet-50 hover:bg-violet-400/25 rounded-md flex items-center gap-4 group'
              key={index}
            >
              {subtask.completed ? (
                <div className='flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-sm bg-violet-700'>
                  <CheckIcon className='stroke-white' />
                </div>
              ) : (
                <div className='flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-sm bg-white border border-slate/25' />
              )}

              <span
                className={`text-slate text-body-md group-hover:text-black ${
                  subtask.completed && 'line-through'
                }`}
              >
                {subtask.title}
              </span>
            </li>
          ))}
        </ul>
        <div className='flex flex-col gap-4 w-full'>
          <span className='text-slate text-body-md'>Current Status</span>
          <Controller
            name='columnId'
            // control={control}
            render={({ field }) => <Select field={field} />}
          />
        </div>
      </form>
    </div>
  );
};

export default ViewTask;
