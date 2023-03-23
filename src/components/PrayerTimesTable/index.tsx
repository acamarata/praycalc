import styles from './styles.module.css';
import moment from 'moment-timezone';

interface PrayerTimesTableProps {
  prayerTimes: any;
}

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({ prayerTimes }) => {
  const today = moment().format('MMMM D, YYYY');
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={styles.container}>
      <h2>{prayerTimes.city}</h2>
      <p className={styles.date}>{today}</p>
      <table className={styles.table}>
        <tbody>
          {prayerTimes.times && prayerTimes.times.map((time: any, index: number) => (
            <tr key={index} className={time.name === 'sunrise' ? styles.sunriseRow : ''}>
              <td className={styles.label}>{capitalizeFirstLetter(time.name)}</td>
              <td className={styles.value}>{time.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesTable;
