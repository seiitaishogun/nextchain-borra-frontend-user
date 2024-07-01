import { parseJSON, stringifyJSON } from '@/utils/storage';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/storage/localStorage';
import { localStorageKey } from '@/constants/content/form';

const setContentFormStorage = (contentId: number, values: any) => {
  try {
    const formData = new Map(
      parseJSON(getLocalStorageItem(localStorageKey)) || null
    );

    const curValues = formData.get(contentId) || {};
    formData.set(contentId, { ...curValues, ...values });
    setLocalStorageItem(
      localStorageKey,
      stringifyJSON(Array.from(formData.entries()))
    );
  } catch {
    /* empty */
  }
};

export { setContentFormStorage };
