import { parseJSON, stringifyJSON } from '@/utils/storage';

const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      return parseJSON(savedValue);
    }
  }
  return null;
};

const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    if (value === null) {
      removeLocalStorageItem(key);
    } else if (typeof value === 'object') {
      localStorage.setItem(key, stringifyJSON(Array.from(value.entries())));
    } else {
      localStorage.setItem(key, stringifyJSON(value));
    }
  }
};

const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
