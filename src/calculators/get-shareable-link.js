import React, { useRef, useState, useMemo } from "react";
import classnames from "classnames";
import IconContentCopy from "materialish/icon-content-copy";
import IconCheck from "materialish/icon-check";
import "./get-shareable-link.css";
import Popover from "../common/popover";
import Input from "../common/input";
import useOs from "../hooks/use-os";
import useIsSmallScreen from "../hooks/use-is-small-screen";
import morph from "../utils/animations/morph";
import expand from "../utils/animations/expand";

const ANIMATION_DURATION = 150;

export default function GetShareableLink({ calculationUrl, ...otherProps }) {
  const inputRef = useRef(null);
  const copyBtnRef = useRef(null);
  const popperOptions = {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  };
  const [showSuccessMsg, setShowSuccessMsg] = useState(null);

  const os = useOs();
  const isSmallScreen = useIsSmallScreen();

  function onClickCopyBtn() {
    if (inputRef.current && typeof inputRef.current.select === "function") {
      inputRef.current.select();
    }

    let success;
    try {
      success = document.execCommand("copy");
    } catch {
      success = false;
    }

    setShowSuccessMsg(success ? "SUCCEEDED" : "FAILED");
  }

  const duration = ANIMATION_DURATION;

  // TODO: remove REDUCE_MOTION from morph, and conditionally choose an animation
  // instead.
  const animation = useMemo(() => {
    if (isSmallScreen) {
      return expand(duration);
    } else {
      return morph(duration);
    }
  }, [isSmallScreen, duration]);

  return (
    <Popover
      {...otherProps}
      className="sheet sheet-clearBg getShareableLink_popover"
      aria-label="Share or bookmark calculation"
      overlayClassName="getShareableLink_overlay"
      popperOptions={popperOptions}
      initialFocusRef={copyBtnRef}
      disablePopper={isSmallScreen}
      onLeave={() => setShowSuccessMsg(null)}
      animation={animation}
    >
      <div className="getShareableLink_description">
        Share or bookmark calculation with this URL:
      </div>
      <div className="getShareableLink_inputContainer">
        <Input
          inputRef={inputRef}
          className="getShareableLink_input input-small"
          value={calculationUrl}
          onChange={() => {}}
          onClick={(event) => event.target.select()}
        />
        <button
          ref={copyBtnRef}
          type="button"
          className="button getShareableLink_copyBtn"
          onClick={onClickCopyBtn}
        >
          <IconContentCopy />
          Copy
        </button>
      </div>
      {showSuccessMsg && (
        <div
          className={classnames("getShareableLink_result", {
            "getShareableLink_result-info": showSuccessMsg === "FAILED",
          })}
        >
          {showSuccessMsg === "SUCCEEDED" && (
            <>
              <IconCheck /> Copied to clipboard!
            </>
          )}
          {showSuccessMsg === "FAILED" && (
            <>
              Press{" "}
              <kbd>
                {os === "mac" ? "cmd" : "ctrl"}
                +c
              </kbd>{" "}
              to copy the URL.
            </>
          )}
        </div>
      )}
    </Popover>
  );
}
