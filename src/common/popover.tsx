import React, { useRef, useState, useMemo } from "react";
import classnames from "classnames";
import { usePopper } from "react-popper";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useMountTransition, useCurrentRef } from "core-hooks";

interface Animation {
  enter: (options: any) => void;
  exit: (options: any) => void;
}

interface PopoverProps {
  children: React.ReactNode;
  referenceElement: HTMLElement | null;
  active: boolean;
  popperOptions: any;

  className?: string;
  overlayClassName?: string;
  onDismiss?: () => void;
  disableScroll?: boolean;
  animation?: Animation;
  animationDuration?: number;
  onEntering?: () => void;
  onEnter?: () => void;
  onLeaving?: () => void;
  onLeave?: () => void;
  arrowRef?: React.RefObject<HTMLElement | null>;
  arrowProps?: any;
  disablePopper?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

export default function Popover({
  children,
  className = "",
  overlayClassName = "",

  active,
  onDismiss,

  referenceElement,
  disableScroll = true,

  animation,
  animationDuration = 150,

  onEntering,
  onEnter,
  onLeaving,
  onLeave,

  popperOptions,
  arrowRef,
  arrowProps,
  disablePopper,

  initialFocusRef,

  ...otherProps
}: PopoverProps) {
  const dialogElementRef = useRef(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    popperOptions
  );

  const popperElements = useMemo(() => {
    return {
      referenceElement,
      popperElement,
    };
  }, [referenceElement, popperElement]);

  const popperElementsRef = useCurrentRef(popperElements);

  const callbackRefs = useCurrentRef({
    onEntering,
    onEnter,
    onLeaving,
    onLeave,
  });

  const [shouldMount, useActiveClass] = useMountTransition({
    shouldBeMounted: active,
    transitionDurationMs: animationDuration,
    // @ts-ignore
    onEnteringTimeout: true,
    onEntering() {
      if (animation && typeof animation.enter === "function") {
        animation.enter({
          overElRef: dialogElementRef,
          overBoundingBox: popperElementsRef.current?.popperElement?.getBoundingClientRect(),
          targetBoundingBox: popperElementsRef.current?.referenceElement?.getBoundingClientRect(),
          curve: "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
        });
      }

      if (typeof callbackRefs.current.onEntering === "function") {
        callbackRefs.current.onEntering();
      }
    },
    onLeaving() {
      if (animation && typeof animation.exit === "function") {
        animation.exit({
          overElRef: dialogElementRef,
          overBoundingBox: popperElementsRef.current?.popperElement?.getBoundingClientRect(),
          targetBoundingBox: popperElementsRef.current?.referenceElement?.getBoundingClientRect(),
        });
      }

      if (typeof callbackRefs.current.onLeaving === "function") {
        callbackRefs.current.onLeaving();
      }
    },

    onEnter() {
      if (typeof callbackRefs.current.onEnter === "function") {
        callbackRefs.current.onEnter();
      }
    },

    onLeave() {
      if (typeof callbackRefs.current.onLeave === "function") {
        callbackRefs.current.onLeave();
      }
    },
  });

  if (!shouldMount) {
    return null;
  }

  const popperStyles = disablePopper ? {} : styles.popper;
  const popperAttributes = disablePopper ? {} : attributes.popper;

  return (
    <DialogOverlay
      className={classnames(`popover_overlay ${overlayClassName}`, {
        "popover_overlay-active": useActiveClass,
      })}
      style={{
        "--popover-animation-duration": `${animationDuration}ms`,
      }}
      dangerouslyBypassScrollLock={!disableScroll}
      isOpen={shouldMount}
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
    >
      {/* See: https://popper.js.org/docs/v2/faq/#how-do-i-add-css-transitions-without-disabling-adaptive */}
      <div
        className="popper-wrapper"
        ref={setPopperElement}
        style={{
          ...popperStyles,
        }}
        {...popperAttributes}
      >
        <DialogContent
          ref={dialogElementRef}
          className={classnames(`popover ${className}`, {
            "popover-active": useActiveClass,
          })}
          {...otherProps}
        >
          <div>{children}</div>
          {arrowRef && (
            <div {...arrowProps} ref={arrowRef} style={styles.arrow} />
          )}
        </DialogContent>
      </div>
    </DialogOverlay>
  );
}
