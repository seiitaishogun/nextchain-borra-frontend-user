import { AtomEffect } from 'recoil';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from '@/utils/storage/localStorage';
import { parseJSON } from '@/utils/storage';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const savedValue = getLocalStorageItem(key);
      if (savedValue !== null) {
        setSelf(parseJSON(savedValue));
      }

      onSet((newValue: any, _, isReset) => {
        if (isReset) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, newValue);
        }
      });
    }
  };

export default localStorageEffect;
