import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import StarRating from '../shared_components/StarRating.jsx';
import { ProdPageContext } from '../product_page.jsx';
import getOutfitDetails from './fetchYourOutfitData.js';

const YourOutfitCarousel = ({ outfitDetails, saveToStorage, removeFromStorage }) => {
  // console.log('outfitDetails', outfitDetails);
  const {prod_id} = useContext(ProdPageContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = outfitDetails.slice(currentImageIdx, (currentImageIdx + 3)); // change to 4
  const maxDisplay = outfitDetails.length > 0 ? outfitDetails.length - 3 : 3; // change to 4
  const placeholder = 'http://placecorgi.com/260/180';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  // useEffect(() => {
  //   setCurrentImageIdx(0);
  // }, [outfitDetails]);

  return (
    <div>
      <CarouselContainer>
        {currentImageIdx !== 0 ?
        <LeftArrow icon={faAngleLeft} onClick={() => prevSlide()}/> :
        <LeftArrowTransparent icon={faAngleLeft}/>}
        <CarouselWrapper>
          <AddCard>
            <AddIcon onClick={(e) => saveToStorage(e, prod_id)}>
                Add To Outfit
            </AddIcon>
          </AddCard>
            {display.map((details, index) => {
              return (
                <IndividualCardStyle key={index}>
                  <ImageWrapper>
                    <ImageStyle
                      src={details.image === null ? placeholder : details.image}
                    />
                    <ButtonStyle>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        onClick={(e) => removeFromStorage(e, prod_id)}
                      />
                    </ButtonStyle>
                  </ImageWrapper>
                  <DetailsWrapper>
                    <CategoryStyle>{details.category}</CategoryStyle>
                    <NameStyle>{details.name}</NameStyle>
                    <PriceStyle>${details.price}</PriceStyle>
                    <RatingsStyle>{StarRating(details.rating)}</RatingsStyle>
                  </DetailsWrapper>
                </IndividualCardStyle>
              )
            })}
        </CarouselWrapper>
          {currentImageIdx === maxDisplay ?
          <RightArrowTransparent icon={faAngleRight} /> :
          <RightArrow icon={faAngleRight} onClick={() => nextSlide()}/>}
      </CarouselContainer>
    </div>
  )
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  flex-direction: row;
  position: relative;
  display: flex;
  object-fit: cover;
  align-items: center;
`;

const AddCard = styled.div`
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
  height: 340px;
  object-fit: contain;
  overflow: hidden;
  text-align: center;
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
  object-fit-contain;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  height: 230px;
  width: 240px;
  overflow: hidden;
  object-fit: contain;
`;

const ImageStyle = styled.img`
  display: block;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100%;
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
  top: 170px;
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
  top: 170px;
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
  top: 170px;
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
  top: 170px;
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
    color: red;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const AddIcon = styled.button`
  align-items: center;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  top: 40%;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;

  &:hover {
  background: #F6F9FE;
  color: #174ea6;
  }

  &:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
  }

  &:focus {
  outline: none;
  border: 2px solid #4285f4;
  }

  &:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }

  &:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
  }

  &:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }

  &:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
  }

  &:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
`;

export default YourOutfitCarousel;