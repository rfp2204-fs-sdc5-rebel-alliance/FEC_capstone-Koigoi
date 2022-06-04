import React, { useRef, useState, useContext } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import StarRating from '../../shared_components/StarRating.jsx';
import EmptyCard from './EmptyCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {
  SlideContainer, SlideWrapper, CardStyle, ImageWrapper,
  ImageStyle, DetailsWrapper, InfoStyle, CategoryStyle,
  PriceStyle, Arrow, ArrowTransparent, OutfitButtonStyle,
  SalesPrice, OriginalPrice
} from '../Styled/Carousel.Styled.js';

const YourOutfitSlider = ({ outfitDetails, saveToStorage, removeFromStorage }) => {
  const { prod_id, setProd } = useContext(ProdPageContext);
  const [count, setCount] = useState(0);
  const maxDisplay = outfitDetails.length - 3;
  const listRef = useRef(null);
  const placeholder = 'https://wallpaperaccess.com/full/44303.jpg';

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -270,
        behavior: 'smooth',
      });
    }
    if (count > 0) {
      setCount((count - 1));
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: +270,
        behavior: 'smooth',
      });
    }
    if (count < maxDisplay) {
      setCount((count + 1));
    }
  };

  const changeProductID = (id) => {
    setProd(id);
  }

  return (
    <SlideContainer className="CarouselContainer">
      {
        count !== 0
        ? <Arrow icon={ faAngleLeft } onClick={ scrollLeft }/>
        : <ArrowTransparent icon={ faAngleLeft }/>
      }
      <SlideWrapper className="SlideWrapper" ref={ listRef }>
        <EmptyCard className="EmptyCard" saveToStorage={ saveToStorage }/>
          {outfitDetails.map((details, index) => {
            return (
              <CardStyle className="CardStyle"key={ index }>
                <ImageWrapper className="ImageWrapper">
                  <ImageStyle className="ImageStyle"
                    src={ details.image === null ? placeholder : details.image }
                    onClick={(id) => changeProductID(details.id)}
                  />
                  <OutfitButtonStyle className="button">
                    <FontAwesomeIcon
                      icon={ faCircleXmark }
                      onClick={(e) => removeFromStorage(e, details.id)}
                    />
                  </OutfitButtonStyle>
                </ImageWrapper>
                <DetailsWrapper className="Details">
                  <InfoStyle>
                    <span> {details.name} </span>
                    <CategoryStyle> {details.category} </CategoryStyle>
                    <span> {StarRating(details.rating)} </span>
                  </InfoStyle>
                  {details.salesPrice
                  ? <PriceStyle>
                    <OriginalPrice> ${Math.trunc(details.price)} </OriginalPrice>
                    <SalesPrice> ${Math.trunc(details.salesPrice)} </SalesPrice>
                  </PriceStyle>
                  : <PriceStyle>
                    <div> ${Math.trunc(details.price)} </div>
                  </PriceStyle>}
                </DetailsWrapper>
              </CardStyle>
            )
          })}
        </SlideWrapper>
        {
          (count !== maxDisplay && outfitDetails.length >= 3)
          ? <Arrow icon={faAngleRight} onClick={scrollRight}/>
          : <ArrowTransparent icon={faAngleRight}/>
        }
    </SlideContainer>
  )
};

export default YourOutfitSlider;

