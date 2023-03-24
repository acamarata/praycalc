import moment from 'moment-timezone';
import SunCalc from 'suncalc';
import { LatLng } from '../interfaces';

interface RawPrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const calculatePrayerTimes = async (latitude: number, longitude: number): Promise<RawPrayerTimes> => {
  const date = new Date();
  const times = SunCalc.getTimes(date, latitude, longitude);

  return {
    fajr: times.nadir,
    sunrise: times.sunrise,
    dhuhr: times.solarNoon,
    asr: times.goldenHour,
    maghrib: times.sunset,
    isha: times.night,
  };
};

function formatPrayerTimes(prayerTimes: RawPrayerTimes, timezone: string): PrayerTimes {
  if (!timezone) {
    throw new Error('No timezone provided');
  }

  const formattedTimes: Partial<PrayerTimes> = {};

  for (const [key, value] of Object.entries(prayerTimes)) {
    if (value instanceof Date) {
      formattedTimes[key as keyof PrayerTimes] = moment(value).tz(timezone).format('h:mm A');
    } else {
      formattedTimes[key as keyof PrayerTimes] = value;
    }
  }

  return formattedTimes as PrayerTimes;
}

export { calculatePrayerTimes, formatPrayerTimes };
