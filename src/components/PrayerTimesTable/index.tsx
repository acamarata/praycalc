import React from 'react';
import { PrayerTimes } from '../../interfaces';
import styles from './styles.module.css';
import moment from 'moment';

interface PrayerTimesTableProps {
  visible: boolean;
  prayerTimes: PrayerTimes;
  cityName: string;
}

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ visible, prayerTimes, cityName }) => {
  const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const grayTextPrayers = new Set(['Sunrise']);

  return (
    <div className={`${styles.container} ${visible ? styles.visible : ''}`}>
      <h2 className={styles.cityName}>{cityName}</h2>
      <h3 className={styles.date}>{moment().format('MMMM D, YYYY')}</h3>
      <table className={styles.table}>
        <tbody>
          {Object.entries(prayerTimes)
          .filter(([, timeString]) => moment(timeString, 'HH:mm').isValid())
          .map(([prayerName, timeString], index) => (
            <tr key={prayerName} className={grayTextPrayers.has(prayerNames[index]) ? styles.grayText : ''}>
              <td>{prayerNames[index]}</td>
              <td>{timeString}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;
