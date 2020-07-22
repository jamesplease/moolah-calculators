import React from "react";
import Modal from "../common/modal";
import CalculatorDetailsModalBody from "./calculator-details-modal-body";

export default function CalculatorDetailsModal({
  active,
  onClose,
  title,
  children,
}) {
  return (
    <Modal active={active} onBeginClose={onClose}>
      <CalculatorDetailsModalBody
        onClose={onClose}
        title={title}
        children={children}
      />
    </Modal>
  );
}
