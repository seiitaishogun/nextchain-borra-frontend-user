import { useCallback } from 'react';

interface Props {
  trigger: (name?: string | string[]) => Promise<boolean>;
}

function useFormTrigger({ trigger }: Props) {
  const handleTrigger = useCallback(() => {
    (async () => {
      await trigger();
    })();
  }, [trigger]);

  const handleValidate = useCallback(
    (callback: () => void) => {
      (async () => {
        const check = await trigger();
        if (!check) {
          return;
        }
        callback();
      })();
    },
    [trigger]
  );

  return { handleTrigger, handleValidate };
}

export default useFormTrigger;
