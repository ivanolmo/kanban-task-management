import BoardIcon from '@/assets/icon-board.svg';

// This comp will be used in map of existing board list to display boards in sidebar
// conditional bg/text color based on active board
const SidebarItem = () => {
  return (
    <li className='py-4 px-6 rounded-r-full mr-4'>
      <a href='#' className='flex items-center gap-3 text-md font-bold '>
        <BoardIcon className='fill-slate' />
        <span className=''>Placeholder title</span>
      </a>
    </li>
  );
};

export default SidebarItem;
