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
      <h1>Cart Here</h1>
      <h1>{cart.length}</h1>
    </Container>
  )

}

export default CartDisplay;

