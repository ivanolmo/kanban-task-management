import useStore from 'src/store/boardStore';
import PlusIcon from '@/assets/icon-add-task-mobile.svg';

const AddColumn = () => {
  const store = useStore();

  return (
    <div
      className='flex flex-col justify-center items-center flex-shrink-0 w-72 h-[40rem] mt-10 bg-indigo rounded-md shadow-md hover:shadow-xl transition-all group cursor-pointer'
      onClick={() => store.toggleEditBoardModal()}
    >
      <div className='flex items-center gap-2'>
        <span>
          <PlusIcon className='fill-slate group-hover:scale-125 group-hover:rotate-180 transition-all' />
        </span>
        <h1 className='text-slate group-hover:scale-105 transition-all'>
          New Column
        </h1>
      </div>
    </div>
  );
};

export default AddColumn;
