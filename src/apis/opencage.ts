import { LatLng } from '../interfaces';

const API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

export async function getLatLngFromCity(city: string): Promise<LatLng | null> {
  if (!API_KEY) {
    throw new Error('OpenCage API key is missing.');
  }

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${API_KEY}`
  );
  if (response.ok) {
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    }
  }
  return null;
}
