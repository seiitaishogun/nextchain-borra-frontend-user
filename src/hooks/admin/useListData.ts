import { AdminListT } from '@/types/admin/list';

function useListData<T>(data?: AdminListT<T>) {
  if (!data) {
    return {
      counts: {
        search_count: 0,
        search_sum: 0,
        total_count: 0,
        total_sum: 0,
        type_count: {},
      },
      list: [],
      paginate: 0,
    };
  }

  return {
    counts: {
      search_count: data?.counts?.search_count || 0,
      search_sum: data?.counts?.search_sum || 0,
      total_count: data?.counts?.total_count || 0,
      total_sum: data?.counts?.total_sum || 0,
      type_count: data?.counts?.type_count || {},
    },
    list: data?.list || [],
    paginate: data?.paginate || 0,
  };
}

export default useListData;
