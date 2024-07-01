const formatCount = (num: number | null) => {
  if (num === null) return 0;
  return num > 999 ? '999+' : num;
};

export { formatCount };
