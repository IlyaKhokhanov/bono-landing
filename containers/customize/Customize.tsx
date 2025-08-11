import Image from 'next/image';

import styles from './Customize.module.scss';

export default function Customize() {
  return (
    <section id="customize" className={styles.customize}>
      <h2>
        Get noticed with a custom card to <span>fit your style</span>
      </h2>

      <p>
        Stand out from the crowd by not settling for a boring bank card. Choose a card color that reflects your style,
        and the app will adapt to match it.
      </p>

      <Image
        src="/images/glass-cards.jpg"
        alt="Glass cards"
        loading="lazy"
        width={1440}
        height={860}
        className={styles.heroImage}
      />

      <Image src="/images/cards.png" alt="Cards" loading="lazy" width={613} height={829} className={styles.cards} />
    </section>
  );
}
