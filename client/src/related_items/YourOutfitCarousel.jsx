import React, { useState, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import StarRating from '../shared_components/StarRating.jsx';
import EmptyCard from './YourOutfitEmptyCard.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const YourOutfitCarousel = ({ outfitDetails, saveToStorage, removeFromStorage }) => {
  const {prod_id} = useContext(ProdPageContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = outfitDetails.slice(currentImageIdx, (currentImageIdx + 3));
  const maxDisplay = outfitDetails.length - 3;
  const placeholder = 'http://placecorgi.com/260/180';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  return (
    <CarouselContainer className='CarouselContainer'>
      {
        currentImageIdx !== 0 ?
        <Arrow icon={faAngleLeft} onClick={() => prevSlide()}/> :
        <ArrowTransparent icon={faAngleLeft}/>
      }
      <CarouselWrapper className='CarouselWrapper'>
        <EmptyCard className='EmptyCard' saveToStorage={saveToStorage}/>
          {display.map((details, index) => {
            return (
              <IndividualCardStyle className='CardStyle'key={index}>
                <ImageWrapper className='ImageWrapper'>
                  <ImageStyle className='ImageStyle'
                    src={details.image === null ? placeholder : details.image}
                  />
                  <ButtonStyle className='button'>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={(e) => removeFromStorage(e, details.id)}
                    />
                  </ButtonStyle>
                </ImageWrapper>
                <DetailsWrapper className='Details'>
                  <CategoryStyle>{details.category}</CategoryStyle>
                  <NameStyle>{details.name}</NameStyle>
                  <DetailsStyle>${details.price}</DetailsStyle>
                  <DetailsStyle>{StarRating(details.rating)}</DetailsStyle>
                </DetailsWrapper>
              </IndividualCardStyle>
            )
          })}
      </CarouselWrapper>
        {
          (currentImageIdx !== maxDisplay && display.length >= 3) ?
          <Arrow icon={faAngleRight} onClick={() => nextSlide()}/> :
          <ArrowTransparent icon={faAngleRight}/>
        }
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: flex-start;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  object-fit: cover;
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

const DetailsStyle = styled.div`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

const Arrow = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 160px;
  cursor: pointer;
  user-select: none;
  transform: scale(0.75);
  &:hover,
  &:focus {
    transform: scale(1.0);
  }
`;

const ArrowTransparent = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 160px;
  visibility: hidden;
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
  line-height: normal;
  padding: 2px 3px;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);

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

export default YourOutfitCarousel;