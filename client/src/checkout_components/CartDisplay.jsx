import React, { useState, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import config from '../../dist/config.js';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 60%;
  border: 0.5rem solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

