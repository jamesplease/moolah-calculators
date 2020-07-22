import { useMemo } from "react";
import queryString from "query-string";

export default function useCalculationUrl(state) {
  const url = useMemo(() => {
    const search = queryString.stringify({
      ...state,
    });

    return `${window.location.origin}${window.location.pathname}?${search}`;
  }, [state]);

  return url;
}
