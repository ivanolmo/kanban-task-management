import { useState } from 'react';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import CheckIcon from '@/assets/icon-check.svg';

import type { Subtask } from 'src/types/boardTypes';
import clsx from 'clsx';

type SubtaskItemProps = {
  key: string;
  subtask: Subtask;
  updateCount: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const SubtaskItem = (props: SubtaskItemProps): JSX.Element => {
  const [completed, setCompleted] = useState(props.subtask?.completed);

  const store = useStore();
  const trpcCtx = trpc.useContext();

  const { mutate, error, isLoading } = trpc.useMutation(
    ['tasks.complete-subtask'],
    {
      onSuccess: () => {
        // TODO maybe just invalidate the column?
        trpcCtx.invalidateQueries(['boards.get-boards']);
        setCompleted(true);
      },
    }
  );

  const handleClick = () => {
    if (!completed) {
      props.updateCount((prev) => (prev as number) + 1);
      mutate({
        taskId: store.selectedTask?.id as string,
        subtaskId: props.subtask.id,
      });
    } else {
      // do nothing
    }
  };

  return (
    <li
      className='pl-3 pr-6 py-4 bg-violet-50 dark:bg-zinc hover:bg-violet-700/25 dark:hover:bg-violet-700/25 rounded-md flex items-center gap-4 cursor-pointer'
      onClick={() => handleClick()}
    >
      {completed ? (
        <div className='flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-sm bg-violet-700'>
          <CheckIcon className='stroke-white' />
        </div>
      ) : (
        <div className='flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-sm bg-white dark:bg-gunmetal-800 border border-slate/25' />
      )}

      <span
        className={clsx(
          'text-body-md',
          completed
            ? 'text-slate dark:text-white/50 line-through'
            : 'text-black dark:text-white'
        )}
      >
        {props.subtask?.title}
      </span>
    </li>
  );
};

export default SubtaskItem;
