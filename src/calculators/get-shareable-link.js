import React, { useRef, useState } from "react";
import classnames from "classnames";
import IconContentCopy from "materialish/icon-content-copy";
import IconCheck from "materialish/icon-check";
import "./get-shareable-link.css";
import Popover from "../common/popover";
import Input from "../common/input";

export default function GetShareableLink({ calculationUrl, ...otherProps }) {
  const inputRef = useRef(null);
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

  const os = "mac";

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

  return (
    <Popover
      {...otherProps}
      className="sheet sheet-clearBg getShareableLink_popover"
      aria-label="Share or bookmark calculation"
      overlayClassName="getShareableLink_overlay"
      popperOptions={popperOptions}
      // disablePopper={isSmallScreen}
      onLeave={() => setShowSuccessMsg(null)}
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
