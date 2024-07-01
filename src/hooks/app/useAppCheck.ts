import { useEffect, useState } from 'react';

function useAppCheck() {
  const [isApp, setIsApp] = useState<boolean | null>(false);

  useEffect(() => {
    if (isApp) {
      return;
    }

    const appCheck = !!(window || {})?.flutter_inappwebview;
    setIsApp(appCheck);
  }, []);

  return { isApp };
}

export default useAppCheck;
