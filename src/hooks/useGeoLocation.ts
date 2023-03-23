import { useEffect, useState } from 'react';
import { getLocation } from '../helpers/getLocation';

interface GeoLocation {
  latitude: number;
  longitude: number;
}

const useGeoLocation = (): GeoLocation | null => {
  const [location, setLocation] = useState<GeoLocation | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getLocation();
        setLocation({ latitude, longitude });
      } catch (error) {
        setLocation(null);
      }
    })();
  }, []);

  return location;
};

export default useGeoLocation;
