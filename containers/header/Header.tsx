'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/button/Button';
import Link from '@/components/link/Link';
import { navLinks } from '@/common/data';

import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={styles.header} id="header">
      <a href="#home" className={styles.logo} />

      <button className={`${styles.burger} ${open ? styles.open : ''}`} onClick={toggle} aria-label="Открыть меню">
        <span />
        <span />
      </button>

      <nav className={styles.nav}>
        <ul className={`${styles.menu} ${open ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <li
              key={link.title}
              onClick={() => {
                if (open) toggle();
              }}
            >
              <Link title={link.title} link={link.link} variant="nav" />
            </li>
          ))}
          <li className={styles.footerText}>Ⓒ 2025 WIVO Finance Inc. All rights reserved.</li>
        </ul>
        <Button text="Get started" variant="tertiary" />
      </nav>

      <div className={`${styles.overlay} ${open ? styles.show : ''}`} onClick={toggle} />
    </header>
  );
}
