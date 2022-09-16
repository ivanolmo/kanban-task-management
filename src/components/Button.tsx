interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  size?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'rg',
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-1 btn group text-md ${variant} ${size} ${
        disabled ? 'disabled' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
