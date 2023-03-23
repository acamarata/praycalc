import { useState, useEffect, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';
import PrayerTimesTable from '../components/PrayerTimesTable';
import useGeoLocation from '../hooks/useGeoLocation';
import useFetchPrayerTimes from '../hooks/useFetchPrayerTimes';
import styles from '../layouts/MainLayout/styles.module.css';
import { LatLng } from '../interfaces';

const HomePage = () => {
  const [searchCoordinates, setSearchCoordinates] = useState<LatLng | null>(null);
  const [userSearchedCity, setUserSearchedCity] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const geoLocation = useGeoLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const coordinates = searchCoordinates || geoLocation;
  const { prayerTimes, error } = useFetchPrayerTimes(coordinates?.latitude || null, coordinates?.longitude || null);

  const handleSearch = async (coordinates: LatLng) => {
    setUserSearchedCity(true);
    setSearchCoordinates(coordinates);
  };

  useEffect(() => {
    if (prayerTimes) {
      if (containerRef.current) {
        containerRef.current.classList.add(styles.topLeft);
      }

      // Added setTimeout to delay the fade-in of the Results block
      setTimeout(() => {
        setResultsVisible(true);
      }, 1000);
    }
  }, [prayerTimes]);

  return (
    <MainLayout>
      <div ref={containerRef} className={styles.container}>
        <h1>PrayCalc.org</h1>
        <SearchBar onSearch={handleSearch} />
        {geoLocation === null && !userSearchedCity && (
          <ErrorMessage message="Automatic location unavailable. Please enter your city to get started!" isError={false} />
        )}
        {error && <ErrorMessage message={error} />}
      </div>
      <div className={styles.tableContainer}>
        {prayerTimes && <PrayerTimesTable prayerTimes={prayerTimes} visible={resultsVisible} />}
      </div>
    </MainLayout>
  );
};

export default HomePage;
