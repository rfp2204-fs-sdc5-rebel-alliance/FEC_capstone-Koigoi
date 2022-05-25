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

  // if (!Array.isArray(images) || images.length === 0) {
  //   return null;
  // }

  const handleModal = (event) => {
    const imageSrc = event.target.src;
    setModalHeaderContent(null)
    setModalBodyContent(<ModalImageContainer src={imageSrc}></ModalImageContainer>)
    setShowModal(true);
  }

  return (
    <ThumbnailContainer>
      <Image
        src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        onClick={handleModal}>
      </Image>
      <Image
        src="https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
        onClick={handleModal}>
      </Image>
      <Image
        src="https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
        onClick={handleModal}>
      </Image>
      <Image
        src="https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        onClick={handleModal}>
      </Image>
      <Image
        src="https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        onClick={handleModal}>
        </Image>

      {/* {images.map((image) =>
        <Image
          src={image.url}
          onClick={handleModal}>
        </Image>
      )} */}
    </ThumbnailContainer>
  );
}

export default ImageThumbnail;