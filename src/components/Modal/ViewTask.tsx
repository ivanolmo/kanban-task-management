import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Select from '@/components/ui/Select';
import Submenu from '@/components/ui/Submenu';
import SubtaskItem from '@/components/Task/SubtaskItem';
import CrossIcon from '@/assets/icon-cross.svg';

const ViewTask: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [completedSubtaskCount, setCompletedSubtaskCount] = useState<
    number | undefined
  >(0);

  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(['tasks.move-task'], {
    onSuccess: () => {
      // TODO check
      trpcCtx.invalidateQueries(['boards.get-boards']);
      store.clearSelectedTask();
    },
  });

  const { control } = useForm({
    defaultValues: {
      columnId: '',
    },
    mode: 'onBlur',
  });

  const toggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const handleDelete = () => {
    store.toggleViewTaskModal();
    store.toggleDeleteTaskModal();
  };

  const handleClose = () => {
    store.toggleViewTaskModal();
    store.clearSelectedTask();
  };

  // mutation to move task to another column
  const handleColumnMove = (columnId: string, taskId: string) => {
    mutate({ columnId, taskId });
  };

  useEffect(() => {
    setCompletedSubtaskCount(
      store.selectedTask?.subtasks.filter((subtask) => subtask.completed).length
    );
  }, [store.selectedTask?.subtasks]);

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='space-y-6 w-full'>
      <div className='flex justify-between items-center gap-4 w-full'>
        <h2 className=''>{store.selectedTask?.title}</h2>
        <div className='flex items-center gap-2'>
          <Submenu
            showMenu={showMenu}
            handleDelete={handleDelete}
            handleEdit={() => console.log('edit')}
            toggleMenu={toggleMenu}
          />
          <button onClick={() => handleClose()}>
            <CrossIcon className='stroke-red-600 w-6 h-6' />
          </button>
        </div>
      </div>
      <div className='space-y-6 w-full'>
        <div className='flex flex-col gap-2'>
          <p className='text-slate text-body-lg'>
            {store.selectedTask?.description}
          </p>
        </div>

        <div className='relative flex flex-col gap-2'>
          <span className='text-slate text-body-md'>{`Subtasks (${completedSubtaskCount} of ${store.selectedTask?.subtasks?.length})`}</span>
        </div>

        <ul className='flex flex-col gap-4 w-full'>
          {store.selectedTask?.subtasks?.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              updateCount={setCompletedSubtaskCount}
            />
          ))}
        </ul>
        <div className='flex flex-col gap-4 w-full'>
          <span className='text-slate text-body-md'>Current Status</span>
          <Select
            control={control}
            name='columnId'
            handleColumnMove={handleColumnMove}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
