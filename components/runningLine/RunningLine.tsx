import Image from 'next/image';
import styles from './RunningLine.module.scss';

export default function RunningLine() {
  const items = [
    {
      href: 'https://www.bono.digital/',
      img: '/images/logo-bono.png',
      alt: 'Bono logo',
    },
    {
      href: 'https://www.bono.digital/',
      img: '/images/logo-bono.png',
      alt: 'Bono logo',
    },
  ];

  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {[...Array(2)].map((_, i) => (
          <div key={i} className={styles.content}>
            {repeatedItems.map((item, idx) => (
              <a key={`${i}-${idx}`} href={item.href} target="_blank" rel="noreferrer">
                <Image src={item.img} alt={item.alt} width={290} height={38} />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
