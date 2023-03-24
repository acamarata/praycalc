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
  const [loading, setLoading] = useState(false);
  const [userSearchedCity, setUserSearchedCity] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [displayLocationMessage, setDisplayLocationMessage] = useState(false);
  const [geoLocation, geolocationFinished] = useGeoLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const coordinates = searchCoordinates || geoLocation;
  const { prayerTimes, error } = useFetchPrayerTimes(coordinates?.latitude || null, coordinates?.longitude || null);

  const handleSearch = async (coordinates: LatLng, cityData: { city: string }) => {
    setLoading(true);
    setUserSearchedCity(true);
    setSearchCoordinates(coordinates);
  };
  
  useEffect(() => {
    if (geolocationFinished && geoLocation === null) {
      setDisplayLocationMessage(true);
    }
  }, [geolocationFinished, geoLocation]);

  useEffect(() => {
    if (prayerTimes || error) {
      setLoading(false);
    }
    if (prayerTimes) {
      if (containerRef.current) {
        containerRef.current.classList.add(styles.topLeft);
      }
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  }, [prayerTimes, error]);

  return (
    <MainLayout>
      <div ref={containerRef} className={styles.container}>
        <h1>PrayCalc.net</h1>
        <SearchBar onSearch={(coordinates, cityData) => handleSearch(coordinates, cityData)} />
        {!geolocationFinished && !userSearchedCity && !prayerTimes && !error && (
          <ErrorMessage message="Loading..." isError={false} />
        )}
        {geoLocation === null && geolocationFinished && !prayerTimes && !error && !userSearchedCity && !loading && (
          <ErrorMessage message="Automatic location unavailable. Please enter your city to get started!" isError={false} />
        )}
        {loading && (
          <ErrorMessage message="Loading..." isError={false} />
        )}
        {error && <ErrorMessage message={error} />}
      </div>
      {prayerTimes && (
        <div className={styles.resultsContainer}>
          <PrayerTimesTable
            visible={showResults}
            prayerTimes={prayerTimes}
            cityName={prayerTimes.city}
            state={prayerTimes.state}
            country={prayerTimes.country}
            timezone={prayerTimes.timezone}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default HomePage;
