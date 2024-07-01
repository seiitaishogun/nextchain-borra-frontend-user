import React from 'react';

/**
 * @param formatData object data
 * @description 관리자 검색시 object 데이터 array 형식으로 변환
 */
const formatObjectToArray = (formatData?: { [key: string]: boolean }) => {
  if (!formatData) return [];

  const newData: Array<number | string> = [];
  Object.keys(formatData).forEach(k => {
    if (formatData[k]) newData.push(k);
  });
  return newData;
};

/**
 * @param setSearchFilters 검색 필터 state 업데이트 함수
 * @description 검색 필터 입력 함수
 */
const updateSearchFilters =
  <T>(setSearchFilters: React.Dispatch<React.SetStateAction<T>>) =>
  ({ name, value }: { name: string; value: unknown }) => {
    setSearchFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

export { formatObjectToArray, updateSearchFilters };
