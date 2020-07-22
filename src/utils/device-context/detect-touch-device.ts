const supportsQuery = Boolean(window.matchMedia);
const query = supportsQuery ? window.matchMedia('(hover: none)') : null;

// Returns true when a device's primary input method is touch

export function matches(): boolean {
  return Boolean(query?.matches);
}

export function subscribe(cb: (matches: boolean) => void) {
  if (!window.matchMedia) {
    cb(false);
  }

  function handler(e: MediaQueryListEvent) {
    cb(e.matches);
  }

  query?.addListener(handler);

  return () => query?.removeListener(handler);
}
