//@ flow

import * as React from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

type ModalProps = {
  show: boolean,
  children: React.Node,
  onCloseModal: () => void
};

class Modal extends React.Component<ModalProps, {}> {
  renderModal() {
    const { children, show, onCloseModal } = this.props;

    if (!show) {
      return null;
    }

    return [
      <ModalContent>{children}</ModalContent>,
      <ModalOverlay onClick={onCloseModal} />
    ];
  }

  render() {
    const { container } = this.props;

    return createPortal(this.renderModal(), container);
  }
}

export default Modal;

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
  background: grey;
  overflow: hidden;
  opacity: 0.3;
  z-index: 5000;
`;
