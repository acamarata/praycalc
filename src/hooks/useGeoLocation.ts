import { useEffect, useState } from 'react';
import { LatLng } from '../interfaces';
import { getLocation, getFallbackLocation } from '../helpers/getLocation';

const useGeoLocation = (): [LatLng | null, boolean] => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [geolocationFinished, setGeolocationFinished] = useState<boolean>(false);

  useEffect(() => {
    const fetchGeoLocation = async () => {
      try {
        const coords = await getLocation();
        setLocation(coords);
      } catch (error) {
        console.error('Unable to get location from browser geolocation:', error);

        try {
          const fallbackCoords = await getFallbackLocation();
          setLocation(fallbackCoords);
        } catch (fallbackError) {
          console.error('Unable to get location from IP-based geolocation:', fallbackError);
          setLocation(null);
        }
      } finally {
        setGeolocationFinished(true);
      }
    };

    fetchGeoLocation();
  }, []);

  return [location, geolocationFinished];
};

export default useGeoLocation;
