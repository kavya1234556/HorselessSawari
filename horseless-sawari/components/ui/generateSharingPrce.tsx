const generateSharingPrice = (payablePrice) => {
  const Charge = Math.floor(payablePrice * 1.2); //20% sharing charge is calculated
  const sharingCharge = Charge - payablePrice;
  return { sharingCharge };
};

export default generateSharingPrice;
