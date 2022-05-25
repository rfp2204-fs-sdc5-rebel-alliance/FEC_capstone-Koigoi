import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import RelatedProductDetail from './RelatedProductDetails.jsx';
import styled from 'styled-components';

export const RelatedItemsContext = createContext();

const RelatedItems = () => {
  const {prod_id} = useContext(ProdPageContext);

  return (
    <RelatedProductsSection>
      <TitleStyle> Related Products </TitleStyle>
      <Wrapper>
      <RelatedItemsContext.Provider value={{}}>
        <CardStyle> <RelatedProductDetail /> </CardStyle>
      </RelatedItemsContext.Provider>
      </Wrapper>
      <TitleStyle> Your Outfit </TitleStyle>
    </RelatedProductsSection>
  )
}

const Wrapper = styled.div`
  // width: 100%;
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr 1fr;
  // font-family:
`;

const CardStyle = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // position: relative;
`;

const TitleStyle = styled.h3`
  text-transform: uppercase;
  padding-left: 15px;
  padding-bottom: 10px;
  font-size: 20px;
`;

const RelatedProductsSection = styled.section`
  // display: inline-block;
  // left: 50%;
  // position: relative;
  // transform: translateX(-50%);
`;

export default RelatedItems;