'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Button from '@/components/button/Button';

import styles from './Main.module.scss';

export default function Main() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className={styles.main}>
      <div className={styles.content}>
        <h1>Your future revolutionary banking</h1>
        <p>
          {isMobile
            ? 'Introducing our innovative website featuring customized banking solutions that we can tailor to your unique needs'
            : 'Introducing our innovative banking website that we can design for your unique needs. Offering both physical and virtual debit cards in addition to a user-friendly banking app. Create your personalized site with customized functionalities today.'}
        </p>
        <div className={styles.buttonsWrapper}>
          <Button text="Get started" variant="primary-black" />
          <Button text="Find out more" variant="secondary" />
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/images/glass-promo.png"
          alt="Glass promo"
          width={1113}
          height={1475}
          priority
          className={styles.heroImage}
        />

        <Image
          src="/images/hand-promo.png"
          alt="Hand with card"
          width={563}
          height={775}
          priority
          className={styles.handImage}
        />
      </div>
    </section>
  );
}
