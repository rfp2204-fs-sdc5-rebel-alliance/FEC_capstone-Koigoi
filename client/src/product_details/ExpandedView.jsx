import React, { useState, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ExpandedCarousel from './components/ExpandedCarousel.jsx';
import ImageList from './components/ImageList.jsx';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const CenterContainer = styled.div`
  width: 100%;
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

const ExpandedView = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodStyles, setProdStyles, imageGallery, setGallery, setExpanded} = useContext(ProdDetailsContext);

  return (
    <Container>
      {imageGallery.photos &&
      <ImageList images={imageGallery.photos}/>
      }
      <CenterContainer>
        {ExpandedCarousel(imageGallery.photos)}
      </CenterContainer>
      <ExpandStyle>
        <FontAwesomeIcon icon={faCompress} onClick={() => {setExpanded(false)}}/>
      </ExpandStyle>
    </Container>
  );
};

export default ExpandedView;

