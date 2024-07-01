import { MutableRefObject, useEffect, useRef, useState } from 'react';

function useIsElementInViewport(options?: IntersectionObserverInit) {
  const elementRef: MutableRefObject<any> = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return { elementRef, isVisible };
}

export default useIsElementInViewport;
