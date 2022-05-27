import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ProdPageContext } from '../product_page.jsx';

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ImageContainer = styled.div`
  height: 75px;
  width: 100px;
  border: 1px solid black;
  margin-right: 10px;
`;

const Image = styled.img`
  max-height: 75px;
  margin-right: 10px;
`;

const ModalImageContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 700px;
  max-width: 700px;
`;

function ImageThumbnail ({images}) {
  const { setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const handleModal = (event) => {
    const imageSrc = event.target.src;
    setModalHeaderContent(null)
    setModalBodyContent(<ModalImageContainer src={imageSrc}></ModalImageContainer>)
    setShowModal(true);
  }

  return (
    <ThumbnailContainer>
      {images.map((image) =>
        <Image
          src={image.url}
          onClick={handleModal}>
        </Image>
      )}
    </ThumbnailContainer>
  );
}

export default ImageThumbnail;