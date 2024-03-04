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

    times[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);

    startHourInMinute = startHourInMinute + interval;
  }

  return times;
};

export default generateHoursInterval;
