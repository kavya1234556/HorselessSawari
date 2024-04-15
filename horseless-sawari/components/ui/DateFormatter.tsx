import React from 'react';

const DateFormatter = ({ date }) => {
  // Convert date string to Date object
  const dateObject = new Date(date);

  // Get the month abbreviation
  const monthAbbreviation = dateObject.toLocaleString('default', {
    month: 'short',
  });

  // Get the day
  const day = dateObject.getDate();

  // Get the year
  const year = dateObject.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${monthAbbreviation} ${day} ${year}`;

  return <span>{formattedDate}</span>;
};

export default DateFormatter;
