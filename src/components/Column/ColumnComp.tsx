import ColumnItem from './ColumnItem';

import type { Column } from 'src/types/boardTypes';

type ColumnProps = {
  column: Column;
};

const ColumnComp = (props: ColumnProps): JSX.Element => {
  enum Colors {
    todo = '#49c4e5',
    doing = '#8471f2',
    done = '#67e2ae',
  }

  const color =
    Colors[props.column?.columnName.toLowerCase() as keyof typeof Colors];

  return (
    <div className='flex flex-col gap-6 w-72 flex-shrink-0'>
      <div className='flex items-center gap-3 text-slate uppercase'>
        <span
          className='w-4 h-4 rounded-full flex-shrink-0'
          style={{ backgroundColor: color }}
        ></span>
        <h4>{props.column?.columnName}</h4>
        <span className='text-body-md tracking-widest -ml-2'>{`(${props.column?.tasks?.length})`}</span>
      </div>
      <ul className='space-y-5'>
        {props.column?.tasks.map((task) => (
          <ColumnItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default ColumnComp;
