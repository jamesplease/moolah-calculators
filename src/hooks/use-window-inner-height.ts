import { useState, useEffect } from 'react';
import { useCurrentRef } from 'core-hooks';
import constate from 'constate';

function useWindowInnerHeight(): number {
  const [innerHeight, setInnerHeight] = useState(() => window.innerHeight);
  const innerHeightRef = useCurrentRef(innerHeight);

  useEffect(() => {
    function handler() {
      if (window.innerHeight !== innerHeightRef.current) {
        setInnerHeight(window.innerHeight);
      }
    }

    window.addEventListener('resize', handler, {
      passive: true,
    });

    return () => {
      window.removeEventListener('resize', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return innerHeight;
}

const [WindowInnerHeightProvider, useWindowInnerHeightContext] = constate(
  useWindowInnerHeight
);

export default useWindowInnerHeightContext;
export { WindowInnerHeightProvider };
