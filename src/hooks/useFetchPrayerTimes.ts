import { useState, useEffect } from 'react';
import { calculatePrayerTimes, formatPrayerTimes } from '../helpers/calculatePrayerTimes';

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

        // Get the city name from reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const locationData = await response.json();
        const city = locationData.address.city || locationData.address.town || locationData.address.village;

        const formattedPrayerTimes = formatPrayerTimes(rawPrayerTimes);
        console.log('Formatted prayer times:', formattedPrayerTimes);

        // Add the city name to the prayerTimes object
        setPrayerTimes({ ...formattedPrayerTimes, city });
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
