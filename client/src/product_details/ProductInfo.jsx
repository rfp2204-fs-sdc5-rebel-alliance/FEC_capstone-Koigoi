import React, { useState, useContex, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';
import config from '../../dist/config.js';

//may need to import more stuff to begin work
import StylesBlock from './components/StylesBlock.jsx';
import ShopSection from './ShopSection.jsx';
import StarRating from '../shared_components/StarRating.jsx';

const Container = styled.div`
  width: 40%;
  border: 0.5rem solid red;
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
`;

const DiscountText = styled.div`
  display: inline-block;
  margin-left: 1rem;
  font-size: 2rem;
  color: red;
`;

const ProductInfo = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);
  const {ratingsObj} = useContext(ProdPageContext);

  if (!prodObj.data) {
  return null;
  }
  return (
    <Container>
      {ratingsObj.totalRatings > 0 &&
        <div>
          <CategoryText>{StarRating(ratingsObj.avgRating)}</CategoryText>
          <CategoryText onClick={() => window.location.replace("/#RatingsAndReviews")}>Read all {ratingsObj.totalRatings} reviews</CategoryText>
        </div>
      }
      <CategoryText>{prodObj.data.category}</CategoryText>
      <NameText>{prodObj.data.name}</NameText>
      {imageGallery.sale_price === null ?
        <OtherText>{imageGallery.original_price}</OtherText>
        :
        <>
          <DiscountText>{imageGallery.sale_price}</DiscountText>
          <StrikeText>{imageGallery.original_price}</StrikeText>
        </>
      }
      <OtherText>Style: {imageGallery.name}</OtherText>
      <StylesBlock />
      <ShopSection />
    </Container>
  )
}

export default ProductInfo;