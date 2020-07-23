import { useOnChange } from "core-hooks";
import useWindowInnerHeight from "../hooks/use-window-inner-height";

export default function useSetAppHeight() {
  const windowInnerHeight = useWindowInnerHeight();

  useOnChange(windowInnerHeight, (innerHeight) => {
    document.documentElement.style.setProperty(
      "--appHeight",
      `${innerHeight}px`
    );
  });
}
