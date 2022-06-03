import React, { useState, useContext } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import StarRating from '../../shared_components/StarRating.jsx';
import EmptyCard from './EmptyCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { CarouselContainer, CardStyle, ImageWrapper,
         ImageStyle, DetailsWrapper, InfoStyle, CategoryStyle,
         PriceStyle, Arrow, ArrowTransparent, OutfitButtonStyle,
         SalesPrice, OriginalPrice} from '../Styled/Carousel.Styled.js';

const YourOutfitCarousel = ({ outfitDetails, saveToStorage, removeFromStorage }) => {
  const {prod_id, setProd} = useContext(ProdPageContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = outfitDetails.slice(currentImageIdx, (currentImageIdx + 3));
  const maxDisplay = outfitDetails.length - 3;
  const placeholder = 'https://wallpaperaccess.com/full/44303.jpg';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  const changeProductID = (id) => {
    setProd(id);
  }

  return (
    <CarouselContainer className='CarouselContainer'>
      {
        currentImageIdx !== 0 ?
        <Arrow icon={faAngleLeft} onClick={() => prevSlide()}/> :
        <ArrowTransparent icon={faAngleLeft}/>
      }
      <EmptyCard className='EmptyCard' saveToStorage={saveToStorage}/>
        {display.map((details, index) => {
          return (
            <CardStyle className='CardStyle'key={index}>
              <ImageWrapper className='ImageWrapper'>
                <ImageStyle className='ImageStyle'
                  src={details.image === null ? placeholder : details.image}
                  onClick={(id) => changeProductID(details.id)}
                />
                <OutfitButtonStyle className='button'>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    onClick={(e) => removeFromStorage(e, details.id)}
                  />
                </OutfitButtonStyle>
              </ImageWrapper>
              <DetailsWrapper className='Details'>
                <InfoStyle>
                  <span>{details.name}</span>
                  <CategoryStyle>{details.category}</CategoryStyle>
                  <span>{StarRating(details.rating)}</span>
                </InfoStyle>
                {details.salesPrice ?
                <PriceStyle>
                  <OriginalPrice>${Math.trunc(details.price)}</OriginalPrice>
                  <SalesPrice>${Math.trunc(details.salesPrice)}</SalesPrice>
                </PriceStyle>
                :
                <PriceStyle>
                  <div>${Math.trunc(details.price)}</div>
                </PriceStyle>}
              </DetailsWrapper>
            </CardStyle>
          )
        })}
        {
          (currentImageIdx !== maxDisplay && display.length >= 3) ?
          <Arrow icon={faAngleRight} onClick={() => nextSlide()}/> :
          <ArrowTransparent icon={faAngleRight}/>
        }
    </CarouselContainer>
  )
}

export default YourOutfitCarousel;

