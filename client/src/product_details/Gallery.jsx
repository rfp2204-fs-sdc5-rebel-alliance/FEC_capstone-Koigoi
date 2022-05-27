import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';
import config from '../../dist/config.js';

import Carousel from './components/Carousel.jsx';
import ImageList from './components/ImageList.jsx';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 60%;
  border: 0.5rem solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gallery = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodStyles, setProdStyles, imageGallery, setGallery} = useContext(ProdDetailsContext);

  return (
    <Container>
      {imageGallery.photos &&
      <ImageList images={imageGallery.photos}/>
      }
      {Carousel(imageGallery.photos)}
    </Container>
  )

}

export default Gallery;

//{ImageList(imageGallery.photos)}

