type ModalProps = {
  children: React.ReactNode;
  mobile?: boolean;
};

export const Modal = (props: ModalProps) => {
  return (
    <>
      <div
        className={`absolute inset-x-0 bg-gradient ${
          props.mobile ? 'top-16 bottom-0' : 'inset-y-0'
        }`}
      />
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-0 bg-white rounded-lg ${
          props.mobile
            ? 'top-1/3 p-0 w-9/12 max-w-sm'
            : 'top-1/2 p-8 w-11/12 md:w-9/12 max-w-xl'
        }`}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
