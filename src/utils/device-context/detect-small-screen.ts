const supportsQuery = Boolean(window.matchMedia);
const query = supportsQuery ? window.matchMedia('(max-width: 550px)') : null;

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
