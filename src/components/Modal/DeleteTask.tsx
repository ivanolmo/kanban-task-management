import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '@/components/Button';

const DeleteTask: React.FC = () => {
  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(['tasks.delete-task'], {
    onSuccess: () => {
      // TODO maybe just invalidate the column?
      trpcCtx.invalidateQueries(['boards.get-boards']);
      store.toggleDeleteTaskModal();
    },
  });

  const handleDelete = () => {
    mutate(store.selectedTask?.id as string);
  };

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-red-600'>Delete this task?</h2>
      <p className='text-slate text-body-lg'>
        Are you sure you want to delete the{' '}
        <span className='capitalize'>
          &apos;{store.selectedTask?.title}&apos;
        </span>{' '}
        task? This action will remove all{' '}
        <span className='font-bold'>
          {store.selectedTask?.subtasks?.length}
        </span>{' '}
        subtasks and cannot be reversed!
      </p>
      <div className='flex flex-col md:flex-row gap-4'>
        <Button variant='delete' wide onClick={() => handleDelete()}>
          <span>Delete</span>
        </Button>
        <Button
          variant='secondary'
          wide
          onClick={() => store.toggleDeleteTaskModal()}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default DeleteTask;
