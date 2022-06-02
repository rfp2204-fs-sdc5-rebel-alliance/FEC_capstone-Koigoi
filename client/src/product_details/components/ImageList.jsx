import React, { useState, useContext, useEffect } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
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
  width: 3rem;
  height: 3rem;
  margin: 1rem;
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
`;

const SelectedImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
`;

const ArrowStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: scale(0.5);
  &:hover,
  &:focus {
    transform: scale(1.0);
  }
`;

const NoStyle = styled.div`
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.5);
  &:hover,
  &:focus {
  transform: scale(1.0);
}
`;

const ImageList = ({images}) => {
  const {index, setIndex} = useContext(ProdDetailsContext);
  const [range, setRange] = useState({min: 0, max: 7});

  let rangeCheck = () => {
    if (index >= range.max) {
      setRange({min: index - 6, max: index + 1});
    }
    if (index < range.min) {
      setRange({min: index, max: index + 7});
    }
  }

  useEffect(() => {
    if (!Array.isArray(images) || !images.length) {
      return null;
    }
    rangeCheck();
  }, [index])

  return (
    <ListStyle>
        {
          range.min !== 0 && images.length > 7 ?
          <ArrowStyle>
            <FontAwesomeIcon icon={faAngleUp} onClick={() => {setRange({min: range.min - 1, max: range.max - 1})}}/>
          </ArrowStyle>
          : <NoStyle>
              <FontAwesomeIcon icon={faAngleUp}/>
            </NoStyle>
        }
      {images.map((image, number) => {
          if (number >= range.min && number <= range.max - 1) {
            return (
              <ImgContainer key={number}>
                {
                  index === number ?
                    <SelectedImgStyle onClick={() => {setIndex(number)}} src={image.thumbnail_url} alt="No Image" />
                  : <ImgStyle onClick={() => {setIndex(number)}} src={image.thumbnail_url} alt="No Image" />
                }
              </ImgContainer>
            )
          }
        })}
        {
          range.max !== images.length && images.length > 7 ?
          <ArrowStyle>
            <FontAwesomeIcon icon={faAngleDown} onClick={() => {setRange({min: range.min + 1, max: range.max + 1})}}/>
          </ArrowStyle>
          : <NoStyle>
              <FontAwesomeIcon icon={faAngleDown}/>
            </NoStyle>
        }
    </ListStyle>
  )
}

export default ImageList;