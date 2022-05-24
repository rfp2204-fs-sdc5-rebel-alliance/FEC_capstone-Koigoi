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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  padding: 20px 40px;
  border-bottom: 1px solid black;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 40px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px 40px;
  border-top: 1px solid black;
`;

const SubmitButton = styled.button`
  margin-right: 20px;
`;

function Modal ( {header, body, footer} ) {
  const { showModal, setShowModal } = useContext(AppContext);
  if (!showModal) {
    return null;
  }

  const closeModal = () => {
    setShowModal(false);
  }

  // if (footer) {
  //   footer = <SubmitButton>Submit</SubmitButton>
  // }

  return (
    <ModalDiv onClick={closeModal}>
      <ModalContainer onClick={event => event.stopPropagation()}>
        <ModalHeader>
          <h3>{header}</h3>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={closeModal} />
        </ModalHeader>
        <ModalBody>{body}</ModalBody>
        {/* <ModalFooter>
          {footer}
          <button onClick={closeModal}>Close</button>
        </ModalFooter> */}
      </ModalContainer>
    </ModalDiv>
  );
}

export default Modal;