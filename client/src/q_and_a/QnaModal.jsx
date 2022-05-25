import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from '../index.jsx';

const QnaModalDiv = styled.div`
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

const QnaModalContainer = styled.div`
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

const QnaModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid black;
`;

const QnaModalBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 40px 20px 40px;
`;

function QnaModal ( {showModal, setShowModal, headerTitle, body} ) {
  // const { showModal, setShowModal } = useContext(AppContext);
console.log('insdide QnaModal')
  if (!showModal) {
    return null;
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <QnaModalDiv onClick={closeModal}>
      <QnaModalContainer onClick={event => event.stopPropagation()}>
        <QnaModalHeader>
          <h3>{headerTitle}</h3>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={closeModal} />
        </QnaModalHeader>
        <QnaModalBody>{body}</QnaModalBody>
      </QnaModalContainer>
    </QnaModalDiv>
  );
}

export default QnaModal;