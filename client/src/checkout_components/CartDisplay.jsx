import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index.jsx';
import styled from 'styled-components';

//may need to import more stuff to begin work
import CartItem from './CartItem.jsx';

const Container = styled.div`
  width: 65%;
`;

const CartDisplay = () => {
  const {cart, setCart} = useContext(AppContext);

  let handleDelete = (toRemove) => {
    let tempCart = cart.filter((item) => {
      return (item.sku !== toRemove.sku);
    })
    setCart(tempCart);
  }

  return (
    <Container>
      {
        cart.length === 0 ?
          <h1>Empty cart.</h1>
        :
      <div>
        {
          cart.map((item, number) => {
            return (
              <CartItem key={number} item={item}/>
            )
          })
        }
      </div>
      }
    </Container>
  )

}

export default CartDisplay;