import React, { useState, useContex, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';
import StylesBlock from './components/StylesBlock.jsx';
import ShopSection from './ShopSection.jsx';
import StarRating from '../shared_components/StarRating.jsx';

const Container = styled.div`
  width: 40%;
  display: block;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled.div`
  margin-left: 1rem;
  font-size: 1rem;
`;

const NameText = styled.div`
  margin-left: 1rem;
  font-size: 3rem;
`;

const OtherText = styled.div`
  margin-left: 1rem;
  font-size: 2rem;
`;

const StrikeText = styled.div`
  display: inline-block;
  margin-left: 1rem;
  font-size: 2rem;
  text-decoration: line-through;
  color: grey;
`;

const DiscountText = styled.div`
  display: inline-block;
  margin-left: 1rem;
  font-size: 2rem;
  color: black;
`;

const PercentText = styled.div`
  display: inline-block;
  margin-left: 1rem;
  font-size: 2rem;
  color: green;
`;

const ProductInfo = () => {
  const {prod_id, averageRating, totalRatings} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);

  return ( prodObj.data &&
    <Container>
      {totalRatings > 0 &&
        <div>
          <CategoryText>{StarRating(averageRating)}</CategoryText>
          <CategoryText style={{'cursor': 'pointer'}} onClick={() => window.location.replace("/#RatingsAndReviews")}>Read all {totalRatings} reviews</CategoryText>
        </div>
      }
      <NameText>{prodObj.data.name}</NameText>
      <CategoryText>{prodObj.data.category}</CategoryText>
      {imageGallery.sale_price === null ?
        <OtherText>${Math.trunc(imageGallery.original_price)}</OtherText>
        :
        <div>
          <DiscountText>${Math.trunc(imageGallery.sale_price)}</DiscountText>
          <StrikeText>${Math.trunc(imageGallery.original_price)}</StrikeText>
          <PercentText>{Math.trunc((imageGallery.original_price - imageGallery.sale_price) / imageGallery.original_price * 100)}% off</PercentText>
        </div>
      }
      <OtherText>Style: {imageGallery.name}</OtherText>
      <StylesBlock />
      <ShopSection />
    </Container>
  );
};

export default ProductInfo;