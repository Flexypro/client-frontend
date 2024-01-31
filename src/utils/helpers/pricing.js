function getHoursToDeadline(deadline) {
  const hours = 8;
  return hours;
}

export const calculatePrice = (unit, deadline) => {
  const basePrice = 8.0;
  var price = basePrice * unit;
  const hoursRemain = getHoursToDeadline(deadline);

  switch (hoursRemain) {
    case hoursRemain <= 3.1:
      price = price * 1.35;
      break;

    case hoursRemain > 3.1 && hoursRemain < 8.0:
      price = price * 1.2;
      break;

    case hoursRemain >= 8.0:
      price = price;
      break;

    default:
      price = price;
      break;
  }

  console.log(price);

  return price;
};
