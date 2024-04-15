const generateHoursInterval = (
  startHourInMinute,
  endHourInMinute,
  interval
) => {
  const times = [];

  for (let i = 0; startHourInMinute < 24 * 60; i++) {
    if (startHourInMinute > endHourInMinute) break;

    const hh = Math.floor(startHourInMinute / 60);
    const mm = startHourInMinute % 60;

    const hour12 = hh % 12 || 12;

    const ampm = hh < 12 ? 'AM' : 'PM';

    times[i] =
      ('0' + hour12).slice(-2) + ':' + ('0' + mm).slice(-2) + ' ' + ampm;

    startHourInMinute = startHourInMinute + interval;
  }

  return times;
};

export default generateHoursInterval;
