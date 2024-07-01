import { FieldErrors } from 'react-hook-form';

const errorAlert = (err: FieldErrors<any>) => {
  const message = Object.values(err)
    .reduce(
      (acc, cur: any) => `${acc}\n${cur.message || '필수값을 입력해주세요.'}`,
      ''
    )
    .trim();

  window.alert(message);
};

export { errorAlert };
