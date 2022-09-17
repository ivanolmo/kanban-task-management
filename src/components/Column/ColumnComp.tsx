import ColumnItem from './ColumnItem';

const ColumnComp = () => {
  return (
    <div className='flex flex-col gap-6 w-72 flex-shrink-0'>
      <div className='flex items-center gap-3'>
        {/* color of circle customizable? */}
        <span className='w-4 h-4 bg-red-600 rounded-full flex-shrink-0'></span>
        <h4 className='text-slate uppercase'>Todo (4)</h4>
      </div>
      {/* task array map */}
      <ul className='space-y-5'>
        <ColumnItem />
        <ColumnItem />
        <ColumnItem />
        <ColumnItem />
      </ul>
    </div>
  );
};

export default ColumnComp;
