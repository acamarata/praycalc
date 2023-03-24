import moment from 'moment-timezone';
import SunCalc from 'suncalc';
import { LatLng, RawPrayerTimes, PrayerTimes } from '../interfaces';

const calculatePrayerTimes = async (latitude: number, longitude: number): Promise<RawPrayerTimes> => {
  const date = new Date();

  // Calculate the dynamic Fajr and Isha angles
  const fajrAngle = -18 - 0.05 * Math.abs(latitude);
  const ishaAngle = -18 + 0.05 * Math.abs(latitude);

  // Calculate Dhuhr time and Asr angle
  const solar = SunCalc.getTimes(date, latitude, longitude);
  const solarNoon = solar.solarNoon;
  const solarPosition = SunCalc.getPosition(solarNoon, latitude, longitude);
  const asrAngle = (Math.atan(1 / (1 / Math.tan(solarPosition.altitude) + 1))) * 180 / Math.PI;
  const dhuhrTime = new Date(solarNoon.getTime() + 5 * 60 * 1000);

  // Set prayer times
  SunCalc.addTime(fajrAngle, 'fajr', '');
  SunCalc.addTime(asrAngle, '', 'asr');
  SunCalc.addTime(ishaAngle, '', 'isha');
  const times = SunCalc.getTimes(date, latitude, longitude);

  return {
    fajr: times.fajr,
    sunrise: times.sunrise,
    dhuhr: dhuhrTime,
    asr: times.asr,
    maghrib: times.sunset,
    isha: times.isha,
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
