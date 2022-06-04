import React, { useState, useContext, useEffect } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Carousel from './components/Carousel.jsx';
import ImageList from './components/ImageList.jsx';

const Container = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ExpandStyle = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

const Gallery = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodStyles, setProdStyles, imageGallery, setGallery, setExpanded} = useContext(ProdDetailsContext);

  return (
    <Container>
      {imageGallery.photos &&
      <ImageList images={imageGallery.photos}/>
      }
      {Carousel(imageGallery.photos)}
      <ExpandStyle>
        <FontAwesomeIcon icon={faExpand} onClick={() => {setExpanded(true)}}/>
      </ExpandStyle>
    </Container>
  );
};

export default Gallery;

