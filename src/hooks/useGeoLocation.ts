// src/hooks/useGeoLocation.ts
import { useEffect, useState } from 'react';
import { LatLng } from '../interfaces';
import { getLocation } from '../helpers/getLocation';

const useGeoLocation = (): [LatLng | null, boolean] => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updateLocation = async () => {
      try {
        const coords = await getLocation();
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      } catch (err) {
        console.error('Error getting location:', err);
        setError(true);
      }
    };

    updateLocation();
  }, []);

  return [location, error];
};

export default useGeoLocation;
