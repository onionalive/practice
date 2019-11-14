const generateRandomNumber = x => {
  return (Math.sin(x) * 1000000) & 255;
};

export default generateRandomNumber;
