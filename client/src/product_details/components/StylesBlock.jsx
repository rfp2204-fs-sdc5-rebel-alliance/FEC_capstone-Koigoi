import React, { useState, useContext } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const ListStyle = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
`;

const ImgContainer = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 20%;
  aspect-ratio: 1/1;
  margin: 0.5rem;
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
`;

const SelectedImgStyle = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
`;

const StylesBlock = () => {
  const {index, setIndex, imageGallery, setGallery, prodStyles} = useContext(ProdDetailsContext);

  let setStyle = (style) => {
    setGallery(style);
    setIndex(0);
  }

  if (!prodStyles.data) {
    return null;
  } else {
    return (
      <ListStyle>
          {prodStyles.data.results.map((style, index) => {
            return (
              <ImgContainer key={index}>
                {
                  imageGallery.style_id === style.style_id
                  ? <SelectedImgStyle src={style.photos[0].thumbnail_url} alt="No Image" />
                  : <ImgStyle onClick={() => {setStyle(style)}} src={style.photos[0].thumbnail_url} alt="No Image" />
                }
              </ImgContainer>
            )
          })}
      </ListStyle>
    )
  }
}

export default StylesBlock;