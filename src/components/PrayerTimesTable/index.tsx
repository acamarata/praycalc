import React, { useEffect, useState } from 'react';
import { PrayerTimes } from '../../interfaces';
import styles from './styles.module.css';
import moment from 'moment-timezone';

interface PrayerTimesTableProps {
  visible: boolean;
  prayerTimes: PrayerTimes;
  cityName: string;
  state: string | null;
  country: string;
  timezone: string;
}

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({
  visible,
  prayerTimes,
  cityName,
  state,
  country,
  timezone,
}) => {
  const [localTime, setLocalTime] = useState(
    timezone ? moment().tz(timezone).format('MMMM D, YYYY - hh:mm:ss A') : ''
  );

  useEffect(() => {
    if (!timezone) return;

    const interval = setInterval(() => {
      setLocalTime(moment().tz(timezone).format('MMMM D, YYYY - hh:mm:ss A'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timezone]);

  const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const grayTextPrayers = new Set(['Sunrise']);
  const locationString = `${cityName}${state ? `, ${state}` : ''}, ${country}`;

  return (
    <div className={`${styles.container} ${visible ? styles.visible : ''}`}>
      <h2 className={styles.cityName}>{locationString}</h2>
      <h3 className={styles.date}>{localTime}</h3>
      <table className={styles.table}>
        <tbody>
          {Object.entries(prayerTimes)
            .filter(([key]) => key !== 'city' && key !== 'state' && key !== 'country' && key !== 'timezone')
            .map(([prayerName, time], index) => (
              <tr key={prayerName} className={grayTextPrayers.has(prayerNames[index]) ? styles.grayText : ''}>
                <td>{prayerNames[index]}</td>
                <td>{time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;
