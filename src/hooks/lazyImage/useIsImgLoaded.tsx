import { useEffect, useState } from 'react';
import useIsElementInViewport from '@/hooks/lazyImage/useIsElementInViewport';

function useIsImgLoaded(lazy: boolean) {
  const { elementRef, isVisible } = useIsElementInViewport({
    threshold: 0,
  });
  const [isLoaded, setIsLoaded] = useState(!lazy);

  useEffect(() => {
    if (isLoaded || !isVisible) {
      return;
    }

    setIsLoaded(true);
  }, [isVisible]);

  return { elementRef, isLoaded };
}

export default useIsImgLoaded;
