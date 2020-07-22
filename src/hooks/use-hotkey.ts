import { useEffect } from 'react';
import { useCurrentRef } from 'core-hooks';

interface Bindings {
  [Key: string]: (e: KeyboardEvent) => void;
  [Key: number]: (e: KeyboardEvent) => void;
}

export default function useHotkey(
  bindings: Bindings = {},
  { useCapture = false } = {}
) {
  const bindingsRef = useCurrentRef(bindings);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (typeof bindingsRef.current[e.key] === 'function') {
        bindingsRef.current[e.key](e);
      }
    };

    window.addEventListener('keydown', onKeyDown, useCapture);

    return () => window.removeEventListener('keydown', onKeyDown, useCapture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
