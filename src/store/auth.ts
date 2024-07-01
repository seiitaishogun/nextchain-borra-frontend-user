import { atom } from 'recoil';
import { UserT } from '@/types/users';

const authCheckState = atom({
  key: 'authCheckState',
  default: false,
});

const loginState = atom({
  key: 'loginState',
  default: false,
});

const userInfoState = atom<Partial<UserT> | null>({
  key: 'userInfoState',
  default: null,
});

export { authCheckState, loginState, userInfoState };
