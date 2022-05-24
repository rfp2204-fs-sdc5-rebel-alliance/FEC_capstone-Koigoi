import React, { useState, useContext } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

//may need to import more stuff to begin work

const ListStyle = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
`;

const ImgStyle = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: auto;
  margin: 1rem;
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
`;


const ImageList = (slides) => {
  const {index, setIndex} = useContext(ProdDetailsContext);

  return (
    <ListStyle>
      {slides.map((slide, number) => {
          return (
            <div key={number}>
              <ImgStyle onClick={() => {setIndex(number)}} src={slide.thumbnail_url} alt="No Image" />
            </div>
          )
        })}
    </ListStyle>
  )
}

export default ImageList;