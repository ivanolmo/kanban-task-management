interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: string;
  size?: string;
  disabled?: boolean;
  hidden?: boolean;
  wide?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'rg',
  disabled,
  hidden,
  wide,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`flex justify-center items-center gap-1 btn group text-md ${variant} ${size} ${
        wide ? 'wide' : ''
      } ${disabled ? 'disabled' : ''} ${hidden ? 'hidden' : ''}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
