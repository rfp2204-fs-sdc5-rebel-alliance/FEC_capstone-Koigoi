import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ProdPageContext } from '../product_page.jsx';

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 116px;
  margin-top: 5px;
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

// This is for image thumnails
function AddPhotos ({images}) {
  const { setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);

  const handleModal = (event) => {
    const imageSrc = event.target.src;
    setModalHeaderContent(null)
    setModalBodyContent(<ModalImageContainer src={imageSrc}></ModalImageContainer>)
    setShowModal(true);
  }
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  } else {
    return (
      <ThumbnailContainer>
       {images.map((image) =>
        <Image
          key={image.id}
          src={image.url}
          onClick={handleModal}>
        </Image>
      )}
      </ThumbnailContainer>
    )
  };
}

export default AddPhotos;