import React, { useState, useContex, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  display: block;
  justify-content: center;
  align-items: center;
`;

const SloganText = styled.div`
  margin-left: 1rem;
  font-size: 2rem;
`;

const DescText = styled.div`
  margin-left: 1rem;
  font-size: 1rem;
`;

const ProductDesc = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles} = useContext(ProdDetailsContext);

  return ( prodObj.data &&
    <Container>
      <SloganText>{prodObj.data.slogan}</SloganText>
      <DescText>{prodObj.data.description}</DescText>
    </Container>
  );
};

export default ProductDesc;