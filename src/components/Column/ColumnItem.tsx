import useStore from 'src/store/boardStore';

import type { Task } from 'src/types/boardTypes';

type ColumnItemProps = {
  task: Task;
};

const ColumnItem = (props: ColumnItemProps): JSX.Element => {
  const store = useStore();

  const completedSubtasks = props.task?.subtasks?.filter(
    (subtask: { completed: boolean }) => subtask.completed === true
  ).length;

  const handleSelect = () => {
    store.toggleViewTaskModal();
    store.setSelectedTask(props.task);
  };

  return (
    <li
      className='flex flex-col gap-2 px-6 py-4 rounded-lg bg-white shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transition-all'
      onClick={() => handleSelect()}
    >
      <h3>{props.task?.title}</h3>
      <span className='text-slate text-body-md'>
        {props.task?.subtasks?.length > 0
          ? `${completedSubtasks} of ${props.task?.subtasks?.length} subtasks`
          : 'No subtasks'}
      </span>
    </li>
  );
};

export default ColumnItem;
