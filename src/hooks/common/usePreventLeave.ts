import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

interface Props {
  message?: string;
}

function usePreventLeave({ message }: Props) {
  const router = useRouter();
  const confirmMsg = useMemo(
    () => message || `변경사항을 저장하지 않고 이동하시겠습니까?`,
    [message]
  );

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      e.preventDefault();
      (e || window.event).returnValue = confirmMsg;
      return confirmMsg;
    },
    [confirmMsg]
  );

  const handleBeforeChangeRoute = useCallback(
    (url: string) => {
      if (router.pathname !== url && !window.confirm(confirmMsg)) {
        router.events.emit('routeChangeError');
        throw '사이트 변경 취소';
      }
    },
    [confirmMsg]
  );

  const handleInit = () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events.on('routeChangeStart', handleBeforeChangeRoute);
  };

  const handleDestroy = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    router.events.off('routeChangeStart', handleBeforeChangeRoute);
  };

  useEffect(() => {
    handleInit();

    return () => {
      handleDestroy();
    };
  }, []);

  return { handleDestroy };
}

export default usePreventLeave;
