import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ProdPageContext } from '../product_page.jsx';

const ThumbnailContainer = styled.div`
  height: 75px;
  width: 100px;
  background-color: red;
  margin-right: 20px;
`;

const ModalImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 800px;
  background-color: red;
`;

function ImageThumbnail ({image}) {
  const { setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);

  const handleModal = () => {
    setModalHeaderContent(null)
    setModalBodyContent(<ModalImageContainer></ModalImageContainer>)
    setShowModal(true);
  }

  return (
    <div>
      <ThumbnailContainer onClick={handleModal}>
        {image}
      </ThumbnailContainer>
    </div>
  );
}

export default ImageThumbnail;