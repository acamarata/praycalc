import moment from 'moment-timezone';
import SunCalc from 'suncalc';
import { LatLng } from '../interfaces';

const calculatePrayerTimes = async (latitude: number, longitude: number): Promise<any> => {
  const date = new Date();
  const times = SunCalc.getTimes(date, latitude, longitude);

  console.log("Suncalc Times: ", times)

  return {
    fajr: times.nadir,
    sunrise: times.sunrise,
    dhuhr: times.solarNoon,
    asr: times.goldenHour,
    maghrib: times.sunset,
    isha: times.night,
  };
};

const formatPrayerTimes = (prayerTimes: any): any => {
  const timezone = moment.tz.guess();
  const formattedTimes = {};
  Object.entries(prayerTimes).forEach(([name, time]) => {
    formattedTimes[name] = moment(time).tz(timezone).format('H:mm a');
  });

  return formattedTimes;
};

export { calculatePrayerTimes, formatPrayerTimes };
