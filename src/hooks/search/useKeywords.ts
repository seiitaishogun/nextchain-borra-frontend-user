import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchKeywords } from '@/api/search';

function useKeywords() {
  const [keywords, setKeywords] = useState<Array<string>>([]);
  const { data, isSuccess } = useQuery(['keywords'], () => fetchKeywords());

  useEffect(() => {
    if (isSuccess) {
      const newKeywords = data || [];
      setKeywords(newKeywords);
    }
  }, [isSuccess]);

  return keywords;
}

export default useKeywords;
