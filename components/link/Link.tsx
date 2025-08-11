import styles from './Link.module.scss';

interface ILink {
  title: string;
  link: string;
  variant?: 'nav' | 'social' | 'small' | 'medium';
  className?: string;
}

export default function Link({ title, link, variant = 'medium', className = '' }: ILink) {
  const variantClass = styles[variant] || '';
  const combinedClassName = `${styles.link} ${variantClass} ${className}`.trim();

  const isExternal = link.startsWith('http');

  return (
    <a
      href={link}
      className={combinedClassName}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {title}
    </a>
  );
}
