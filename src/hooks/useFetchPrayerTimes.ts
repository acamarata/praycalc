import { useState, useEffect } from 'react';
import { calculatePrayerTimes, formatPrayerTimes } from '../helpers/calculatePrayerTimes';
import { reverseGeocode } from '../apis/opencage';

const useFetchPrayerTimes = (latitude: number | null, longitude: number | null) => {
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (latitude === null || longitude === null) {
      return;
    }

    const fetchPrayerTimes = async (latitude: number, longitude: number) => {
      try {
        setError(null);
        console.log('Fetching prayer times for:', { latitude, longitude });
        const rawPrayerTimes = await calculatePrayerTimes(latitude, longitude);
        console.log('Raw prayer times:', rawPrayerTimes);

        // Get the city name and timezone from reverse geocoding
        const locationData = await reverseGeocode(latitude, longitude);
        if (!locationData) {
          console.error('Location data is not available or incomplete:', locationData);
          setError('Location data is not available');
          return;
        }
        const { city, state, country, timezone } = locationData;

        const formattedPrayerTimes = formatPrayerTimes(rawPrayerTimes, timezone);
        console.log('Formatted prayer times:', formattedPrayerTimes);

        // Add the city name, state, country, and timezone to the prayerTimes object
        setPrayerTimes({ ...formattedPrayerTimes, city, state, country, timezone });
      } catch (err) {
        console.error('Error fetching prayer times:', err);
        setError(err.message);
      }
    };

    fetchPrayerTimes(latitude, longitude);
  }, [latitude, longitude]);

  return { prayerTimes, error };
};

export default useFetchPrayerTimes;
