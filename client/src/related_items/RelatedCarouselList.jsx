import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import StarRating from '../shared_components/StarRating.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const Carousel = (productDetails) => {
  const {prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent} = useContext(ProdPageContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = productDetails.slice(currentImageIdx, (currentImageIdx + 4)); // change to 4
  const maxDisplay = productDetails.length - 4; // change to 4
  const placeholder = 'http://placecorgi.com/260/180';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  useEffect(() => {
    setCurrentImageIdx(0);
  }, [productDetails]);

  const handleModalClick = (id) => {
    // console.log(id); // gets the current product ID for clicked card
    // ComparisonModal(id);
    setModalHeaderContent('COMPARING')
    setModalBodyContent(<ComparisonModal mainId={prod_id} relatedId={id}/>);
    setShowModal(true);
  }

  return (
    <CarouselList>
      {currentImageIdx !== 0 ?
      <LeftArrow icon={faAngleLeft} onClick={() => prevSlide()}/> : <LeftArrowTransparent icon={faAngleLeft}/>}
      <CarouselWrapper>
        {display.map((details) => {
          return (
            <IndividualCardStyle key={details.id}>
              <ImageWrapper>
                <ImageStyle
                  src={details.images === null ? placeholder : details.images}
                />
                <ButtonStyle onClick={() => handleModalClick(details.id)}> <FontAwesomeIcon icon={faStar}/></ButtonStyle>
              </ImageWrapper>
              <DetailsWrapper>
                <CategoryStyle>{details.categories}</CategoryStyle>
                <NameStyle>{details.names}</NameStyle>
                <PriceStyle>${details.prices}</PriceStyle>
                <RatingsStyle>{StarRating(details.ratings.avgRating)}</RatingsStyle>
              </DetailsWrapper>
            </IndividualCardStyle>
          )
        })}
      </CarouselWrapper>
      {currentImageIdx === maxDisplay ?
      <RightArrowTransparent icon={faAngleRight} fill='transparent'/> :
      <RightArrow icon={faAngleRight} onClick={() => nextSlide()}/>}
    </CarouselList>
  )
}

const CarouselList = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const CarouselWrapper = styled.div`
  flex-direction: row;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const IndividualCardStyle = styled.div`
  display: block;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  margin: 15px;
  flex-direction: column;
  flex-wrap: nowrap;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  width: 240px;
  height: fit-content;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  height: 230px;
  width: 240px;
  overflow: hidden;
  object-fit: cover;
`;

const ImageStyle = styled.img`
  display: block;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsWrapper = styled.div`
  position: relative;
  top: 10%;
`;

const CategoryStyle = styled.div`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 15px;
  padding-left: 5px;
  padding-top: 10px;
`;

const NameStyle = styled.div`
  font-weight: bold;
  font-size: 17px;
  padding-left: 5px;
`;

const PriceStyle = styled.div`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

const RatingsStyle = styled.div`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

const LeftArrow = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
`;

const LeftArrowTransparent = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  opacity: .01;
  color: rgba(0, 0, 0, 0.75);
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  filter: blur(2px);
`;

const RightArrow = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
`;

const RightArrowTransparent = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  opacity: .01;
  color: rgba(0, 0, 0, 0.75);
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  filter: blur(2px);
`;

const ButtonStyle = styled.button`
  bottom: 220px;
  left: 205px;
  position: relative;
  border: 1px solid #1A1A1A;
  border-radius: 15px;
  color: #3B3B3B;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  padding: 2px 3px;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: yellow;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export default Carousel;