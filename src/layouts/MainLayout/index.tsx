import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAboutPage = router.pathname === '/about';

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>PrayCalc.net</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={isAboutPage ? styles.aboutContent : styles.content}>{children}</div>
      <div className={styles.linkWrapper}>
        <Link href={isAboutPage ? '/' : '/about'} passHref>
          <span className={styles.link}>
            {isAboutPage ? 'Back to PrayCalc.net' : 'About PrayCalc.net'}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MainLayout;
