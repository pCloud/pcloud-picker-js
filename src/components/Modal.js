//@ flow

import * as React from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

type ModalProps = {
  show: boolean,
  children: React.Node,
  onModalClose: () => void
};

class Modal extends React.Component<ModalProps, {}> {
  _renderModal() {
    const { children, show, onModalClose } = this.props;

    if (!show) {
      return null;
    }

    return (
      <ModalWrapper>
        <ModalContent>{children}</ModalContent>
        <ModalOverlay onClick={onModalClose} />
      </ModalWrapper>
    );
  }

  render() {
    const { container } = this.props;

    return createPortal(this._renderModal(), container);
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
