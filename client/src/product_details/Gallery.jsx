import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import config from '../../dist/config.js';

import Carousel from './components/Carousel.jsx';
import ImageList from './components/ImageList.jsx';

//may need to import more stuff to begin work

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
  )

}

export default Gallery;

