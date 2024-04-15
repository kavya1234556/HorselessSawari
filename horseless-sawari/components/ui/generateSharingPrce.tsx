const generateSharingPrice = (payablePrice) => {
  const Charge = Math.floor(payablePrice * 1.2);
  const sharingCharge = Charge - payablePrice;
  return { sharingCharge };
};

export default generateSharingPrice;
