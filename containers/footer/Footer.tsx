import Image from 'next/image';
import dynamic from 'next/dynamic';

import Link from '@/components/link/Link';
import Button from '@/components/button/Button';
import SocialLink from '@/components/socialLink/SocialLink';
import { navLinks, socialLinks } from '@/common/data';

import styles from './Footer.module.scss';

const LensEffect = dynamic(() => import('@/components/lensEffect/LensEffect'), {
  loading: () => <Image src="/images/logo-footer.svg" alt="Wivo" width={663} height={183} className={styles.logo} />,
});

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src="/images/logo-footer.svg" alt="Wivo" width={262} height={72} className={styles.smallLogo} />

      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link title={link.title} link={link.link} variant="medium" />
            </li>
          ))}
        </ul>
        <Link title="Back to Top" link="#header" variant="medium" />
      </nav>

      <LensEffect />

      <div className={styles.wrapper}>
        <div className={styles.secondaryWrapper}>
          <p className={styles.subtitle}>Join our newsletter to stay up to date on features and releases</p>
          <div className={styles.inputWrapper}>
            <div className={styles.secondaryWrapper}>
              <input type="text" placeholder="Enter your email" />
              <p className={styles.emailDisclaimer}>
                By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our
                company.
              </p>
            </div>
            <Button text="Subscribe" variant="secondary" />
          </div>
        </div>

        <div className={styles.secondaryWrapper}>
          <p className={styles.subtitle}>Follow us</p>
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <SocialLink key={link.alt} img={link.img} link={link.link} alt={link.alt} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.endWrapper}>
        <div className={styles.terms}>
          <p>Ⓒ 2025 WIVO Finance Inc. All rights reserved.</p>
          <Link title="Privacy Policy" link="#" variant="small" />
          <Link title="Terms of Service" link="#" variant="small" />
          <Link title="Cookies Settings" link="#" variant="small" />
        </div>
        <div className={styles.appsWrapper}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/google-play.svg"
              alt="google play"
              width={154}
              height={48}
              className={styles.googlePlay}
            />
          </a>

          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src="/images/app-store.svg" alt="app store" width={150} height={51} className={styles.appStore} />
          </a>
        </div>
      </div>
    </footer>
  );
}
