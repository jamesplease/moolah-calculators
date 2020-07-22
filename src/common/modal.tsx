import React from "react";
import IconClose from "materialish/icon-close";
import GoodModal, {
  GoodModalProps,
  GoodModalTitleProps,
} from "../vendor/good-modal";
import { useCurrentRef } from "core-hooks";
import useWindowInnerHeight from "../hooks/use-window-inner-height";

interface ModalProps extends GoodModalProps {
  onBeginClose?: () => void;
}

export default function Modal({
  onBeginClose,
  children,
  ...props
}: ModalProps) {
  const dismissible = typeof onBeginClose === "function";
  const dismissibleRef = useCurrentRef(dismissible);
  const onBeginCloseRef = useCurrentRef(onBeginClose);
  const innerHeight = useWindowInnerHeight();

  function onClose() {
    if (
      dismissibleRef.current &&
      typeof onBeginCloseRef.current === "function"
    ) {
      onBeginCloseRef.current();
    }
  }

  return (
    <GoodModal
      style={{
        "--windowInnerHeight": `${innerHeight}px`,
      }}
      timeout={300}
      onClickOverlay={onClose}
      onPressEsc={onClose}
      {...props}
    >
      {children}
    </GoodModal>
  );
}

interface ModalTitleProps extends GoodModalTitleProps {
  onBeginClose?: () => void;
}

Modal.Title = function ModalTitle({
  children,
  className = "",
  onBeginClose,
  ...otherProps
}: ModalTitleProps) {
  const hasClose = typeof onBeginClose === "function";

  return (
    <GoodModal.Title
      {...otherProps}
      className={`modal_title ${className ? className : ""}`}
    >
      <div className="modal_titleContent">{children}</div>
      {hasClose && (
        <button className="modal_titleClose" onClick={onBeginClose}>
          <IconClose />
        </button>
      )}
    </GoodModal.Title>
  );
};

Modal.Body = GoodModal.Body;
Modal.Footer = GoodModal.Footer;
