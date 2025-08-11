'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';

import RunningLine from '@/components/runningLine/RunningLine';

import styles from './Card.module.scss';

export default function Card() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const { top } = el.getBoundingClientRect();
    const triggerStart = window.innerHeight;
    const animationDistance = 600;

    const raw = (triggerStart - top) / animationDistance;
    setProgress(Math.min(Math.max(raw, 0), 1));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const minTranslate = -200;
  const maxTranslate = -15;
  const translateX = minTranslate + (maxTranslate - minTranslate) * progress;

  return (
    <section id="card" className={styles.card}>
      <p className={styles.label}>{'Used by the world&apos;s most amazing companies'}</p>

      <RunningLine />

      <div className={styles.cardContent}>
        <div className={styles.imageWrapper} ref={sectionRef}>
          <Image
            src="/images/hand-with-card.png"
            alt="Hand with card"
            loading="lazy"
            width={1046}
            height={700}
            style={{
              transform: `translateX(${translateX - 14}%) translateY(63px)`,
              transition: 'transform 0.3s linear',
            }}
            className={styles.image}
          />
        </div>

        <div className={styles.textContent}>
          <h2 className={styles.header}>
            Spend anywhere with a <span>physical debit card</span>
          </h2>
          <p className={styles.description}>
            Experience the ease of using WIVO, a digital bank that offers a physical debit card tailored for effortless
            daily transactions. This card comes equipped with an integrated RFID transponder to enable fast, contactless
            payments.
          </p>
        </div>
      </div>
    </section>
  );
}
