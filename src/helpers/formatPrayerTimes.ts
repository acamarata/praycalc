import moment from 'moment-timezone';

const formatPrayerTimes = (prayerTimes: any, timezone: string): any => {
  const formattedTimes = prayerTimes.times.map((time: any) => {
    return {
      ...time,
      time: moment(time.time).tz(timezone).format('H:mm a'),
    };
  });

  return {
    ...prayerTimes,
    times: formattedTimes,
  };
};

export default formatPrayerTimes;
