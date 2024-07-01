const SURVEY_TOTAL_COUNT_ITEMS = Array.from({ length: 5 }, (_, i) => ({
  label: `${i + 1}개`,
  value: i + 1,
}));

export { SURVEY_TOTAL_COUNT_ITEMS };
