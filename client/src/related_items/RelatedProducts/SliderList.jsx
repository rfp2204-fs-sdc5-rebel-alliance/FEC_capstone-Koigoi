import React, { useRef, useState, useContext, useEffect } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import { RelatedCarouselContext } from './ProductDetails.jsx';
import StarRating from '../../shared_components/StarRating.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {
  SlideContainer, SlideWrapper, CardStyle, ImageWrapper,
  ImageStyle, DetailsWrapper, InfoStyle, CategoryStyle,
  PriceStyle, Arrow, ArrowTransparent, RelatedButtonStyle,
  SalesPrice, OriginalPrice
} from '../Styled/Carousel.Styled.js';

const RelatedSlider = () => {
  const {
    prod_id, setProd, prod_name, setShowModal,
    setModalBodyContent, setModalHeaderContent
  } = useContext(ProdPageContext);
  const { productDetails } = useContext(RelatedCarouselContext);
  const [count, setCount] = useState(0);
  const maxDisplay = productDetails.length - 4;
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

  const handleModalClick = (id) => {
    setModalHeaderContent('COMPARING');
    setModalBodyContent(<ComparisonModal mainId={ prod_id } relatedId={ id }/>);
    setShowModal(true);
  };

  const changeProductID = (id) => {
    setProd(id);
  };

  useEffect(() => {
    listRef.current.scrollLeft = 0;
    setCount(0);
  }, [productDetails]);

  return (
    <SlideContainer className="SlideContainer">
      {
        (count !== 0)
        ? <Arrow icon={ faAngleLeft } onClick={ scrollLeft }/>
        : <ArrowTransparent icon={ faAngleLeft }/>
      }
      <SlideWrapper className="SlideWrapper" ref={ listRef }>
        {productDetails.map((details, index) => {
          return (
            <CardStyle className="CardStyle" key={ index }>
              <ImageWrapper className="ImageWrapper">
                <ImageStyle className="ImageStyle"
                  src={ details.images === null ? placeholder : details.images }
                  onClick={(id) => changeProductID(details.id)}
                />
                <RelatedButtonStyle>
                  <FontAwesomeIcon
                    icon={ faStar }
                    onClick={() => handleModalClick(details.id)}
                  />
                </RelatedButtonStyle>
              </ImageWrapper>
              <DetailsWrapper className="Details">
                <InfoStyle className="InfoStyle">
                  <span> {details.names} </span>
                  <CategoryStyle> {details.categories} </CategoryStyle>
                  <span> {StarRating(details.ratings.avgRating)} </span>
                </InfoStyle>
                {details.salePrices
                ? <PriceStyle>
                  <OriginalPrice> ${Math.trunc(details.prices)} </OriginalPrice>
                  <SalesPrice> ${Math.trunc(details.salePrices)} </SalesPrice>
                </PriceStyle>
                : <PriceStyle>
                  <div> ${Math.trunc(details.prices)} </div>
                </PriceStyle>}
              </DetailsWrapper>
            </CardStyle>
          )
        })}
      </SlideWrapper>
      {
        (count !== maxDisplay && productDetails.length >= 4)
        ? <Arrow icon={ faAngleRight } onClick={ scrollRight }/>
        : <ArrowTransparent icon={ faAngleRight }/>
      }
    </SlideContainer>
  )
};

export default RelatedSlider;