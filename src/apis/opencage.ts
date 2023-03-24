// src/apis/opencage.ts
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

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<{ city: string; state?: string; country: string; timezone: string }> { // Add the optional state property
  if (!API_KEY) {
    throw new Error("OpenCage API key is missing.");
  }

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
  );

  if (response.ok) {
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { components, annotations } = data.results[0];
      const city = components.city || components.town || components.village;
      const state = components.state;
      const country = components.country;
      const timezone = annotations.timezone.name;
      return { city, state, country, timezone };
    }
  }

  throw new Error("Unable to reverse geocode coordinates.");
}
