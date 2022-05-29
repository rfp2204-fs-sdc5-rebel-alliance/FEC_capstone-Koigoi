import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index.jsx';
import styled from 'styled-components';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 100%;
  border: 0.5rem solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CartDisplay = () => {
  const {cart, setCart} = useContext(AppContext);
  const [total, setTotal] = useState(0);

  let getTotal = () => {
    let tempTotal = 0;
    cart.forEach((item) => {
      tempTotal += (item.price * item.quant)
    });
    setTotal(tempTotal);
  }

  useEffect(() => {
    getTotal();
  }, [cart])

  return (
    <Container>
      {
        cart.length === 0 ?
          <h1>Empty cart. Add some items!</h1>
        :
      <div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Style</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.style}</td>
                  <td>{item.size}</td>
                  <td>{item.quant}</td>
                  <td>{item.price * item.quant}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
          <div>Total: {total}</div>
          <button>Checkout</button>
        </div>
      </div>
      }
    </Container>
  )

}

export default CartDisplay;

