import styles from './Button.module.scss';

interface IButton {
  text: string;
  variant?: 'primary-black' | 'primary-white' | 'secondary' | 'tertiary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  text,
  variant = 'primary-black',
  onClick,
  type = 'button',
  className = '',
}: IButton) {
  const variantClass = styles[variant] || '';
  const combinedClassName =
    `${styles.button} ${variantClass} ${className}`.trim();

  return (
    <button type={type} className={combinedClassName} onClick={onClick}>
      {text}
    </button>
  );
}
