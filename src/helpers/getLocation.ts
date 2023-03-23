import { LatLng } from '../interfaces';

const DEFAULT_LOCATION: LatLng = {
  latitude: 0,
  longitude: 0,
};

async function fetchLocationFromIP(): Promise<LatLng | null> {
  try {
    const response = await fetch('https://ip-api.com/json');
    if (response.ok) {
      const data = await response.json();
      return {
        latitude: data.lat,
        longitude: data.lon,
      };
    }
  } catch (error) {
    console.error('Error fetching location from ip-api.com:', error);
  }
  return null;
}

export async function getLocation(): Promise<LatLng> {
  try {
    const position = await new Promise<LatLng>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => reject(err),
        { timeout: 10000 }
      );
    });
    return position;
  } catch (error) {
    console.error('Unable to get location from browser geolocation:', error);
    const ipLocation = await fetchLocationFromIP();
    if (ipLocation) {
      return ipLocation;
    }
  }

  return DEFAULT_LOCATION;
}
