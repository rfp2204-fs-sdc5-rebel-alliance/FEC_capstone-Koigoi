import React, { useState, useContex, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';
import config from '../../dist/config.js';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 100%;
  border: 0.5rem solid green;
  display: flex;
  justify-content: center;
  align-items: center;
`;

let AddButton = () => {

}

const ShopSection = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);

  if (!prodObj.data) {
    return null;
  } else {
    return (
      <Container>
        Shop Section Here.
      </Container>
    )
  }

}

export default ShopSection;