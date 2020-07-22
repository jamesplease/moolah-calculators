import React, { useRef, useState } from "react";
import IconContentCopy from "materialish/icon-content-copy";
import Modal from "../common/modal";
import Input from "../common/input";

export default function ShareLinkModalBody({ onClose, calculationUrl }) {
  const inputRef = useRef(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(null);

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
    <>
      <Modal.Body>
        <Input
          inputRef={inputRef}
          className="getShareableLink_input"
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
      </Modal.Body>
    </>
  );
}
