import { ReferrerPathE } from '@/types/users';

const getReferrer = () => localStorage.getItem('referrer');

const setReferrer = (referrer?: string) => {
  if (referrer) {
    localStorage.setItem('referrer', referrer);
  }
};

const getRedirectUrl = (redirect?: string) => {
  const referrer = getReferrer();
  if (referrer) {
    localStorage.removeItem('referrer');
    return referrer;
  }

  return redirect || '/';
};

const getContentName = () => localStorage.getItem('contentName') || null;

const setContentName = (contentName?: string) => {
  if (contentName) {
    localStorage.setItem('contentName', contentName);
  }
};

const getReferrerPath = () =>
  localStorage.getItem('referrerPath') || ReferrerPathE.BORRA;

const setReferrerPath = (referrerPath?: string) => {
  if (referrerPath) {
    localStorage.setItem('referrerPath', referrerPath);
  }
};

export {
  getReferrer,
  setReferrer,
  getRedirectUrl,
  getContentName,
  setContentName,
  getReferrerPath,
  setReferrerPath,
};
