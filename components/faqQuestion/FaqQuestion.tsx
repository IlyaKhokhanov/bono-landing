'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './FaqQuestion.module.scss';

interface IFaqQuestion {
  data: {
    title: string;
    description: string;
  };
}

export default function FaqQuestion({ data }: IFaqQuestion) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0px';
    }
  }, [isOpen]);

  return (
    <div className={`${styles.question} ${isOpen ? styles.open : ''}`}>
      <button className={styles.header} onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen}>
        <h3 className={styles.title}>{data.title}</h3>
        <Image src="/images/arrow.svg" alt="arrow" width={16} height={12} className={styles.arrow} />
      </button>

      <div className={styles.answerWrapper} ref={contentRef}>
        <p className={styles.answer}>{data.description}</p>
      </div>
    </div>
  );
}
