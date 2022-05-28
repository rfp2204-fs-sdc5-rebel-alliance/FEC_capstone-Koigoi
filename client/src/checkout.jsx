import React from "react";
import { render } from "react-dom";
import styled from 'styled-components';

import CartDisplay from './checkout_components/CartDisplay.jsx';

const Checkout = () => {

  const MainWrapper = styled.div`
  width: 100%;
  border: 0.5rem solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

  return (
    <>
      <h1>This is a Checkout Page</h1>
      <MainWrapper>
        <CartDisplay />
      </MainWrapper>
    </>
  )
}

export default Checkout;