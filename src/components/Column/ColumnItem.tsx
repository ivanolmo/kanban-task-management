// props will be the task title and total number of subtasks
const ColumnItem = () => {
  return (
    <div className='flex flex-col gap-4 px-6 py-4 rounded-lg bg-white shadow-md'>
      <h3>Build UI for onboarding flow</h3>
      <span className='text-slate text-body-md'>0 of 3 subtasks</span>
    </div>
  );
};

export default ColumnItem;
