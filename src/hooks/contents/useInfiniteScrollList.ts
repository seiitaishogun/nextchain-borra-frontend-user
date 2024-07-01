import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdvertiseProps as AdProps } from '@/components/Common/Advertise';

interface AdvertiseProps extends AdProps {
  isInfinite?: boolean;
}

interface Props {
  queryKey: string | Array<string>;
  fetchList: (params: any) => Promise<any>;
  params?: any;
  enabled?: boolean;
  advertiseProps?: AdvertiseProps;
}

function useInfiniteScrollList({
  queryKey,
  fetchList,
  params,
  enabled,
  advertiseProps,
}: Props) {
  const [page, setPage] = useState<number>(1);
  const [listData, setListData] = useState<Array<any>>([]);
  const { data, isFetching, isLoading, isSuccess } = useQuery(
    [typeof queryKey === 'string' ? queryKey : [...queryKey], page, params],
    () => fetchList({ page, ...params }),
    {
      initialData: {
        data: {
          last_page: 1,
          list: [],
          total: 0,
        },
      },
      enabled: page > 0 && enabled,
      select: res => {
        const newData = res.data;

        if (advertiseProps) {
          const { isInfinite, ...advertiseOptions } = advertiseProps;
          if (isInfinite) {
            newData.list.push(advertiseOptions);
          } else if (page === 1) {
            newData.list.push(advertiseOptions);
          }
        }

        return newData;
      },
      onSuccess: res => {
        if (page === 1) {
          setListData(res.list);
        } else {
          setListData(prev => [...prev, ...res.list]);
        }
      },
    }
  );

  useEffect(
    () => () => {
      setPage(1);
      setListData([]);
    },
    []
  );

  const handleFetchNext = () => {
    if (isLoading || isFetching || data.last_page <= page) return;
    setPage(prev => prev + 1);
  };

  return {
    listData,
    handleFetchNext,
    isLoading: isLoading || isFetching || !isSuccess,
    page,
  };
}

useInfiniteScrollList.defaultProps = {
  params: {},
  enabled: true,
};

export default useInfiniteScrollList;
