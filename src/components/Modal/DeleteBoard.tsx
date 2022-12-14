import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import Button from '@/components/Button';

const DeleteBoard = () => {
  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(
    ['boards.delete-board'],
    {
      onSuccess: () => {
        trpcCtx.invalidateQueries(['boards.get-boards']);
        store.toggleDeleteBoardModal();
      },
    }
  );

  const handleDelete = () => {
    mutate(store.selectedBoard?.id as string);
  };

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-red-600'>Delete this board?</h2>
      <p className='text-slate text-body-lg'>
        Are you sure you want to delete the{' '}
        <span className='capitalize'>
          &apos;{store.selectedBoard?.boardName}&apos;
        </span>{' '}
        board? This action will remove all columns and tasks and cannot be
        reversed!
      </p>
      <div className='flex flex-col md:flex-row gap-4'>
        <Button variant='delete' wide onClick={() => handleDelete()}>
          <span>Delete</span>
        </Button>
        <Button
          variant='secondary'
          wide
          onClick={() => store.toggleDeleteBoardModal()}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default DeleteBoard;
