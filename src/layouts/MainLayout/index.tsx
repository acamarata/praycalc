import React from 'react';
import Head from 'next/head';
import styles from './styles.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>PrayCalc.net</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
};

export default MainLayout;
