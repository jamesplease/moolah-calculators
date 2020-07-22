import React from "react";
import Modal from "../common/modal";

export default function CalculatorDetailsModalBody({
  onClose,
  title,
  children,
}) {
  return (
    <>
      <Modal.Title onBeginClose={onClose}>{title}</Modal.Title>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button
          className="button button-primary"
          type="button"
          onClick={onClose}
        >
          Okay
        </button>
      </Modal.Footer>
    </>
  );
}
