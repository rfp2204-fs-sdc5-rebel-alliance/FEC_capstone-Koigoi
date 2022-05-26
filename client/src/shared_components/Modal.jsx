import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from '../index.jsx';

const ModalDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.div`
  min-height: 25%;
  min-width: 25%;
  max-height: 90%;
  max-width: 90%;
  overflow: scroll;
  background-color: white;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  border-bottom: 1px solid black;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 20px 20px;
`;

function Modal () {
  const { showModal, setShowModal, modalBodyContent, modalHeaderContent } = useContext(AppContext);

  if (!showModal) {
    return null;
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <ModalDiv onClick={closeModal}>
      <ModalContainer onClick={event => event.stopPropagation()}>
        <ModalHeader>
          <h3>{modalHeaderContent}</h3>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={closeModal} />
        </ModalHeader>
        <ModalBody>{modalBodyContent}</ModalBody>
      </ModalContainer>
    </ModalDiv>
  );
}

export default Modal;