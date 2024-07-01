import { atom, selectorFamily } from 'recoil';
import localStorageEffect from '@/utils/recoil/localStorageEffect';
import { localStorageKey } from '@/constants/content/form';

const contentsFormAtom = atom({
  key: 'contentsFormAtom',
  default: new Map(),
  effects_UNSTABLE: [localStorageEffect(localStorageKey)],
});

const contentFormSelector = selectorFamily({
  key: 'contentFormSelector',
  get:
    (contendId: number) =>
    ({ get }) => {
      try {
        const formData = new Map(get(contentsFormAtom));
        return formData.get(contendId) || null;
      } catch (err) {
        return null;
      }
    },
  set:
    (contendId: number) =>
    ({ get, set, reset }, newValue) => {
      try {
        const formData = new Map(get(contentsFormAtom));

        if (newValue) {
          formData.set(contendId, newValue);
        } else {
          formData.delete(contendId);
        }

        set(contentsFormAtom, formData);
      } catch (err) {
        reset(contentsFormAtom);
      }
    },
});

const isContentFormSelector = selectorFamily({
  key: 'isContentFormSelector',
  get:
    (contendId: number) =>
    ({ get }) => {
      try {
        const formData = new Map(get(contentsFormAtom));
        return formData.has(contendId);
      } catch (err) {
        return false;
      }
    },
});

export { contentsFormAtom, contentFormSelector, isContentFormSelector };
