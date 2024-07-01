import { atom } from 'recoil';
import localStorageEffect from '@/utils/recoil/localStorageEffect';
import { ContentStepE } from '@/types/content/step';
import { contentStepkey } from '@/constants/content/step';

const contentStepAtom = atom<ContentStepE | null>({
  key: 'contentStepState',
  default: null,
  effects: [localStorageEffect<ContentStepE | null>(contentStepkey)],
});

const isAdvertiseAtom = atom<boolean>({
  key: 'isAdvertiseState',
  default: false,
});

export { contentStepAtom, isAdvertiseAtom };
