import React from 'react';

const generatePrice = (
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
  pricing
) => {
  const pickupDateTime = new Date(`${pickupDate}T${pickupTime}:00`);
  const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime}:00`);

  const durationInMilliseconds =
    dropoffDateTime.getTime() - pickupDateTime.getTime();
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
  const totalDays = dropoffDateTime.getDate() - pickupDateTime.getDate();
  const days = Math.floor(durationInHours / 24);
  const remainingHours = durationInHours % 24;
  const blocks8Hours = Math.floor(remainingHours / 8);
  const blocks4Hours = Math.floor((remainingHours % 8) / 4);
  if (totalDays >= 1) {
    const totalPrice =
      days * pricing[2] +
      blocks8Hours * pricing[1] +
      blocks4Hours * pricing[0] * totalDays;

    const serviceWithCharge = Math.floor(totalPrice * 1.1);
    const ServiceCharge = serviceWithCharge - totalPrice;
    return { totalPrice, ServiceCharge, serviceWithCharge };
  } else {
    const totalPrice =
      days * pricing[2] + blocks8Hours * pricing[1] + blocks4Hours * pricing[0];
    const ServiceCharge = Math.floor(totalPrice * 1.1);
    return { totalPrice, ServiceCharge };
  }
};

export default generatePrice;
