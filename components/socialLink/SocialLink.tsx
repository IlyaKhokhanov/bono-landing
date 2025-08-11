import Image from 'next/image';

import styles from './SocialLink.module.scss';

interface ISocialLink {
  link: string;
  img: string;
  alt?: string;
}

export default function SocialLink({ link, img, alt = 'social icon' }: ISocialLink) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.social}>
      <Image src={img} alt={alt} width={27} height={27} />
    </a>
  );
}
