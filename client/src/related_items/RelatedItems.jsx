import React, { useState, useContext, createContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import RelatedProductDetails from './RelatedProductDetails.jsx';
import YourOutfitDetails from './YourOutfitDetails.jsx';
import styled from 'styled-components';

export const RelatedItemsContext = createContext();

const RelatedItems = () => {
  const {prod_id} = useContext(ProdPageContext);

  return (
    <RelatedProductsSection>
        <RelatedItemsContext.Provider value={{}}>
      <TitleStyle> Related Products </TitleStyle>
          <RelatedProductDetails />
      <TitleStyle> Your Outfit </TitleStyle>
          <YourOutfitDetails />
        </RelatedItemsContext.Provider>
    </RelatedProductsSection>
  )
}

const RelatedProductsSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 1080px;
  padding-bottom: 20px;
  margin-bottom: 20px;

`;

const TitleStyle = styled.h3`
  text-transform: uppercase;
  // padding-left: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 20px;
`;


export default RelatedItems;