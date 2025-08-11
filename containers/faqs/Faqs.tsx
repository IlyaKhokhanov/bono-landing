import { faqsData } from './questions';
import Button from '@/components/button/Button';
import FaqQuestion from '@/components/faqQuestion/FaqQuestion';

import styles from './Faqs.module.scss';
import Link from '@/components/link/Link';

export default function Faqs() {
  return (
    <section className={styles.faqs} id="faqs">
      <div className={styles.title}>
        <h2>FAQs</h2>
        <p>Don’t see your question here?</p>
        <Link title="Get in touch →" link="#" variant="social" />
      </div>

      <div className={styles.questions}>
        {faqsData.map((question) => (
          <FaqQuestion key={question.title} data={question} />
        ))}

        <Button text="Get started" variant="primary-white" className={styles.button} />
      </div>
    </section>
  );
}
