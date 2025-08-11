import Image from 'next/image';

import styles from './App.module.scss';

export default function App() {
  return (
    <section className={styles.app} id="app">
      <div className={styles.content}>
        <h2>
          Spending insights <span>at your fingertips</span>
        </h2>
        <p>
          Crafted to enhance your day-to-day spending with a focus on transparency and efficiency. Instant transfers,
          virtual cards, and heads-up displays offer reassurance and peace of mind when it comes to managing your
          finances.
        </p>
      </div>

      <div className={styles.phoneContainer}>
        <div className={styles.phoneWrapper}>
          <Image
            src="/images/phone-screen.png"
            alt="Phone"
            loading="lazy"
            width={397}
            height={811}
            className={styles.phoneImage}
          />

          <div className={`${styles.tooltip} ${styles.leftTooltip}`}>
            <h3>Financial control</h3>
            <p>Improving visibility of transactions</p>
          </div>

          <div className={`${styles.tooltip} ${styles.rightTooltip}`}>
            <h3>Easily get paid</h3>
            <p>Make payments in a few minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
