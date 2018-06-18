//@ flow

import * as React from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const MODAL_CLASS = "pcloud-modal";
const MODAL_EL = document.createElement("div");
MODAL_EL.setAttribute("id", MODAL_CLASS);
const BODY = global.document.querySelector("body");

type ModalProps = {
  show: boolean,
  children: React.Node,
  closeModal: () => void
};

class Modal extends React.Component<ModalProps, {}> {
  componentWillMount() {
    BODY.appendChild(MODAL_EL);
  }

  componentWillUnmount() {
    BODY.removeChild(MODAL_EL);
  }

  renderModal() {
    const { children, show, closeModal } = this.props;

    if (!show) {
      return null;
    }

    return (
      <ModalWrapper>
        <ModalContent>{children}</ModalContent>
        <ModalOverlay onClick={closeModal} />
      </ModalWrapper>
    );
  }

  render() {
    return createPortal(this.renderModal(), MODAL_EL);
  }
}

export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  font: 11px/34px Arial, Helvetica;
  color: #999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  z-index: 5001;
  min-width: 500px;
  width: 30vw;
`;

const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
  opacity: 0.75;
  z-index: 5000;
`;
