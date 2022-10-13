import { useState } from 'react';

import useStore from 'src/store/boardStore';
import { trpc } from '@/utils/trpc';
import CheckIcon from '@/assets/icon-check.svg';

import type { Subtask } from 'src/types/boardTypes';

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
      className='pl-3 pr-6 py-4 bg-violet-50 hover:bg-violet-400/25 rounded-md flex items-center gap-4 group'
      onClick={() => handleClick()}
    >
      {completed ? (
        <div className='flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-sm bg-violet-700'>
          <CheckIcon className='stroke-white' />
        </div>
      ) : (
        <div className='flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-sm bg-white border border-slate/25' />
      )}

      <span
        className={`text-slate text-body-md group-hover:text-black ${
          completed && 'line-through'
        }`}
      >
        {props.subtask?.title}
      </span>
    </li>
  );
};

export default SubtaskItem;
