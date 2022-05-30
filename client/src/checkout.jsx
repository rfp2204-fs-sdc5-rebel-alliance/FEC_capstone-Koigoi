import React from "react";
import { render } from "react-dom";
import styled from 'styled-components';

import CartDisplay from './checkout_components/CartDisplay.jsx';
import PayForm from './checkout_components/PayForm.jsx';

const Checkout = () => {

  const MainWrapper = styled.div`
  width: 100%;
  border: 0.5rem solid black;
  display: flex;
  justify-content: center;
  align-items: top;
`;

  return (
    <div>
      <h1>This is a Checkout Page</h1>
      <MainWrapper>
        <CartDisplay />
        <PayForm />
      </MainWrapper>
    </div>
  )
}

export default Checkout;