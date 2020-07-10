import { useEffect } from "react";

const BASE_TITLE = "Moolah Calculators";

export default function usePageTitle(title) {
  useEffect(() => {
    const newTitle = title ? `${title} - ${BASE_TITLE}` : BASE_TITLE;

    document.title = newTitle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
