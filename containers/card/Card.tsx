'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';

import RunningLine from '@/components/runningLine/RunningLine';

import styles from './Card.module.scss';

export default function Card() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isTablet, setIsTablet] = useState(false);

  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const { top } = el.getBoundingClientRect();
    const triggerStart = window.innerHeight;
    const animationDistance = isTablet ? 0.1 : 600;

    const raw = (triggerStart - top) / animationDistance;
    setProgress(Math.min(Math.max(raw, 0), 1));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll]);

  const minTranslate = isTablet ? -80 : -200;
  const maxTranslate = isTablet ? -28 : -15;
  const translateX = minTranslate + (maxTranslate - minTranslate) * progress;

  return (
    <section id="card" className={styles.card}>
      <p className={styles.label}>{"Used by the world\'s most amazing companies"}</p>

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
              transform: `translateX(${translateX - 14}%) translateY(${isTablet ? '-195px' : '63px'})`,
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
            Experience the ease of using WIVO,{' '}
            <span>
              <br />
            </span>
            a digital bank that offers a physical{' '}
            <span>
              <br />
            </span>
            debit card tailored for effortless daily transactions. This card comes equipped with an integrated RFID
            transponder to enable fast, contactless payments.
          </p>
        </div>
      </div>
    </section>
  );
}
