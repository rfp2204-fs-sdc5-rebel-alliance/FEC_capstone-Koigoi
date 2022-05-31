import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import RelatedProductDetails from './RelatedProductDetails.jsx';
import YourOutfitDetails from './YourOutfitDetails.jsx';
import styled from 'styled-components';

export const RelatedItemsContext = createContext();

const RelatedItems = () => {
  const {prod_id} = useContext(ProdPageContext);

  return (
    <section>
        <RelatedItemsContext.Provider value={{}}>
      <TitleStyle> Related Products </TitleStyle>
          <RelatedProductDetails />
      <TitleStyle> Your Outfit </TitleStyle>
          <YourOutfitDetails />
        </RelatedItemsContext.Provider>
    </section>
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
  // align-items: center;
  // display: inline-block;
  // left: 50%;
  // position: relative;
  // transform: translateX(-50%);
`;

export default RelatedItems;