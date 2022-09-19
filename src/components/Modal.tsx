export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='absolute inset-0 bg-gradient' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-0 bg-white p-8 rounded-lg w-11/12 md:w-9/12 max-w-xl'>
        {children}
      </div>
    </>
  );
};

export default Modal;
