import React, { useState, useContex, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';

const Container = styled.div`
  width: 40%;
  display: block;
  justify-content: center;
  align-items: center;
  margin-left: 5rem;
`;

const FeatureText = styled.div`
  margin-left: 1rem;
  font-size: 1rem;
`;

const ProductFeatures = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles} = useContext(ProdDetailsContext);

  return ( prodObj.data &&
    <Container>
      {prodObj.data.features.map((feature, index) => {
        return (
          <FeatureText key={index}>
            ✓ {feature.feature}: {feature.value}
          </FeatureText>
        )
      })}
    </Container>
  );
};

export default ProductFeatures;