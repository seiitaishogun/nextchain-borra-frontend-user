import { instance } from '@/utils/axios';
import { AccountCardResponse, AccountListResponse } from '@/types/account/list';
import { ListRequest } from '@/types/list';

const fetchAccountLike = async () => {
  const { data } = await instance.get<AccountCardResponse>(
    `/accounts/contents/likes`
  );
  return data;
};

const fetchAccountLikes = async (params: ListRequest) => {
  const { data } = await instance.get<AccountListResponse>(
    `/accounts/contents/likes/index`,
    { params }
  );
  return data;
};

const fetchAccountReplay = async () => {
  const { data } = await instance.get<AccountCardResponse>(
    `/accounts/contents/replays`
  );
  return data;
};

const fetchAccountReplays = async (params: ListRequest) => {
  const { data } = await instance.get<AccountListResponse>(
    `/accounts/contents/replays/index`,
    { params }
  );
  return data;
};

export {
  fetchAccountLike,
  fetchAccountLikes,
  fetchAccountReplay,
  fetchAccountReplays,
};
