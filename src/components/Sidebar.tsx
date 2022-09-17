import SidebarItem from './Sidebar/SidebarItem';

const Sidebar = () => {
  return (
    <aside
      className='!w-64 hidden md:block transition-all ease-in-out z-10'
      aria-label='Sidebar'
    >
      <div className='flex flex-col justify-between text-slate bg-white border-r border-indigo h-screen py-8'>
        <div>
          <h4 className='uppercase ml-6'>All Boards (3)</h4>
          <ul className='mt-5'>
            {/* this will be a mapped array */}
            <SidebarItem />
            <SidebarItem />
            <SidebarItem />
          </ul>
        </div>
        <div>
          <div>theme switcher</div>
          <div>close sidebar</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
