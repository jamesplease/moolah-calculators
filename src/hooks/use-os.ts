import { useState } from 'react';

export type OS = 'mac' | 'pc';

function isMacintosh(): boolean {
  return navigator.platform.indexOf('Mac') > -1;
}

export default function useOs(): OS {
  const [os] = useState<OS>(() => (isMacintosh() ? 'mac' : 'pc'));

  return os;
}
