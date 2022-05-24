import React, { useState, useContex, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';
import config from '../../dist/config.js';

//may need to import more stuff to begin work
import StylesBlock from './components/StylesBlock.jsx';
import ShopSection from './ShopSection.jsx';

const Container = styled.div`
  width: 40%;
  margin-top: 2rem;
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

  if (!prodObj.data) {
    return null;
  } else {
    if (imageGallery.sale_price === null) {
      return (
        <Container>
          <CategoryText>Stars + Read all reviews link</CategoryText>
          <CategoryText>{prodObj.data.category}</CategoryText>
          <NameText>{prodObj.data.name}</NameText>
          <OtherText>{imageGallery.original_price}</OtherText>
          <OtherText>Style: {imageGallery.name}</OtherText>
          <StylesBlock />
          <ShopSection />
        </Container>
      )
    } else {
      return (
        <Container>
          <CategoryText>Stars + Read all reviews link</CategoryText>
          <CategoryText>{prodObj.data.category}</CategoryText>
          <NameText>{prodObj.data.name}</NameText>
          <DiscountText>{imageGallery.sale_price}</DiscountText>
          <StrikeText>{imageGallery.original_price}</StrikeText>
          <OtherText>Style: {imageGallery.name}</OtherText>
          <StylesBlock />
          <ShopSection />
        </Container>
      )
    }
  }

}

export default ProductInfo;