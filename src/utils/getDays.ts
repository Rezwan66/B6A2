const subtractDates = (start: string, end: string): number => {
  const oneDay = 24 * 60 * 60 * 1000; //ms
  const diffInMs = new Date(end).getTime() - new Date(start).getTime();
  return Math.round(diffInMs / oneDay);
};

export default subtractDates;
