import { useState, useEffect } from 'react';
import * as smallScreen from '../utils/device-context/detect-small-screen';

export default function useIsSmallScreen(): boolean {
  const [isSmallScreen, setIsSmallScreen] = useState(() =>
    smallScreen.matches()
  );

  useEffect(() => {
    const unsubscribe = smallScreen.subscribe((matches) =>
      setIsSmallScreen(matches)
    );
    return () => unsubscribe();
  }, []);

  return isSmallScreen;
}
