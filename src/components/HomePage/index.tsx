import React, { useState } from 'react';
import PrayerTimesTable from '../PrayerTimesTable';
import LoadingSpinner from '../LoadingSpinner';
import styles from './styles.module.css';

interface HomePageProps {
  initialPrayerTimes: any;
}

const HomePage: React.FC<HomePageProps> = ({ initialPrayerTimes }) => {
  const [prayerTimes, setPrayerTimes] = useState(initialPrayerTimes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError('');

    // Call API to fetch prayer times here

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PrayCalc</h1>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Enter city to get prayer times.."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e.target.value);
            }
          }}
        />
        <button className={styles.searchButton} onClick={() => handleSearch('')}>
          Search
        </button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <PrayerTimesTable prayerTimes={prayerTimes} />
      )}
    </div>
  );
};

export default HomePage;
