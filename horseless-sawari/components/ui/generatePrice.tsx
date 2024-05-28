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
  //combining the date and time for calculation
  const durationInMilliseconds =
    dropoffDateTime.getTime() - pickupDateTime.getTime(); //getting the time duration in millisecond
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60); //converting the millisecond into hours
  const totalDays = dropoffDateTime.getDate() - pickupDateTime.getDate(); //getting the number of days the car is booked for
  const days = Math.floor(durationInHours / 24); //rounding up the calculated number of days
  const remainingHours = durationInHours % 24; //calculating the remaing hours of the day(28 = 28-24 = 4)
  const blocks8Hours = Math.floor(remainingHours / 8);
  const blocks4Hours = Math.floor((remainingHours % 8) / 4);
  if (totalDays >= 1) {
    const totalPrice =
      days * pricing[2] +
      blocks8Hours * pricing[1] +
      blocks4Hours * pricing[0] * totalDays;

    const serviceWithCharge = Math.floor(totalPrice * 1.1); //adding the 10% service charge of the app
    const ServiceCharge = serviceWithCharge - totalPrice;
    return { totalPrice, ServiceCharge, serviceWithCharge };
  } else {
    //if the days booked is less then 1
    const totalPrice =
      days * pricing[2] + blocks8Hours * pricing[1] + blocks4Hours * pricing[0];
    const serviceWithCharge = Math.floor(totalPrice * 1.1);
    const ServiceCharge = serviceWithCharge - totalPrice;

    return { totalPrice, ServiceCharge, serviceWithCharge };
  }
};

export default generatePrice;
