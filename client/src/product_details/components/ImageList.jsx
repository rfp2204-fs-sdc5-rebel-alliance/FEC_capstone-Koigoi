import React, { useState, useContext } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

//may need to import more stuff to begin work

const ListStyle = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 1rem;
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
`;


const ImageList = (images) => {
  const {index, setIndex} = useContext(ProdDetailsContext);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <ListStyle>
      {images.map((image, number) => {
          return (
            <ImgContainer key={number}>
              <ImgStyle onClick={() => {setIndex(number)}} src={image.thumbnail_url} alt="No Image" />
            </ImgContainer>
          )
        })}
    </ListStyle>
  )
}

export default ImageList;