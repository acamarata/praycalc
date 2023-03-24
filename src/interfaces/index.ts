export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface PrayerTimesString {
  [key: string]: string;
}

export interface RawPrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}