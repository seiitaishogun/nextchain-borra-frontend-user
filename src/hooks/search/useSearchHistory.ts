import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import {
  fetchSearchHistory,
  fetchDeleteSearchKeyword,
  fetchStoreSearchHistory,
} from '@/api/search';
import { loginState } from '@/store/auth';

function useSearchHistory() {
  const queryClient = useQueryClient();
  const isLogin = useRecoilValue(loginState);
  const [historyKeywords, setHistoryKeywords] = useState<Array<string>>([]);
  const storeKeywordMutation = useMutation(fetchStoreSearchHistory);
  const deleteHistoryKeywordMutation = useMutation(fetchDeleteSearchKeyword);
  const { data: fetchedHistoryKeywords, isSuccess } = useQuery(
    [HISTORY_KEYWORDS_QUERY_KEY],
    () => fetchSearchHistory(),
    {
      enabled: isLogin,
    }
  );

  useEffect(() => {
    if (isSuccess) setHistoryKeywords(fetchedHistoryKeywords);
  }, [isSuccess]);

  const storeHistory = (value: string) => {
    if (!isLogin) return;
    if (!value) return;
    if (storeKeywordMutation.isLoading) return;
    if (historyKeywords.some(keyword => keyword === value)) return; // 중복 검색시 저장 방지
    const newValue = [value, ...historyKeywords];

    if (newValue.length > MAX_STORE_LENGTH) newValue.pop();
    storeKeywordMutation.mutate(value, {
      onSuccess: () => {
        queryClient.setQueryData([HISTORY_KEYWORDS_QUERY_KEY], newValue);
        setHistoryKeywords(newValue);
      },
    });
  };

  const deleteHistory = (value: string) => {
    if (!isLogin) return;
    if (deleteHistoryKeywordMutation.isLoading) return;

    const newValue = historyKeywords.filter(keyword => keyword !== value);
    deleteHistoryKeywordMutation.mutate(value, {
      onSuccess: () => {
        queryClient.setQueryData([HISTORY_KEYWORDS_QUERY_KEY], newValue);
        setHistoryKeywords(newValue);
      },
    });
  };

  return { historyKeywords, storeHistory, deleteHistory };
}

export default useSearchHistory;

const MAX_STORE_LENGTH = 2;
const HISTORY_KEYWORDS_QUERY_KEY = 'historyKeywords';
