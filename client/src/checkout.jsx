import React from "react";
import { render } from "react-dom";
import styled from 'styled-components';
import CartDisplay from './checkout_components/CartDisplay.jsx';
import PayForm from './checkout_components/PayForm.jsx';

const Checkout = () => {
  const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
`;

  return (
    <div>
      <MainWrapper>
        <CartDisplay />
        <PayForm />
      </MainWrapper>
    </div>
  );
};

export default Checkout;