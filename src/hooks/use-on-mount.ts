import { useState, useEffect } from 'react';
import { useCurrentRef } from 'core-hooks';

// Invokes `cb` when the Component mounts.
// Return another callback from the passed-in callback
// for an unmount hook.
export default function useOnMount(cb: () => any) {
  let [isMounted, setIsMounted] = useState(false);

  const cbRef = useCurrentRef(cb);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);

      if (typeof cbRef.current === 'function') {
        return cbRef.current();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
