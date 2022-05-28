import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index.jsx';
import styled from 'styled-components';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 60%;
  border: 0.5rem solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CartDisplay = () => {
  const {cart, setCart} = useContext(AppContext);

  return (
    <Container>
      {
        cart.length === 0 ?
          <h1>Empty cart. Add some items!</h1>
        : cart.map((item) => {
          return (
            <p>{item.sku}: Size: {item.size}: Quantity: {item.quant}</p>
          )
        })
      }
    </Container>
  )

}

export default CartDisplay;

