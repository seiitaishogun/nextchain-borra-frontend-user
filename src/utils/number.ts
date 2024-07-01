const numberWithCommas = (num: number | string) =>
  Number(num).toLocaleString('ko-KR');

export { numberWithCommas };
