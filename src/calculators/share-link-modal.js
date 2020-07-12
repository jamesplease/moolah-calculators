import React from "react";
import Modal from "../common/modal";
import ShareLinkModalBody from "./share-link-modal-body";

export default function ShareLinkModal({ active, onClose, calculationUrl }) {
  return (
    <Modal active={active} onBeginClose={onClose}>
      <ShareLinkModalBody onClose={onClose} calculationUrl={calculationUrl} />
    </Modal>
  );
}
