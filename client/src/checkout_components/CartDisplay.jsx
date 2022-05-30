import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index.jsx';
import { ProdPageContext } from '../product_page.jsx';
import styled from 'styled-components';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 65%;
  border: 0.5rem solid blue;
`;

const CartDisplay = () => {
  const {cart, setCart, setShowModal, setModalBodyContent, setModalHeaderContent} = useContext(AppContext);
  const [total, setTotal] = useState(0);

  let getTotal = () => {
    let tempTotal = 0;
    cart.forEach((item) => {
      tempTotal += (item.price * item.quant)
    });
    setTotal(tempTotal);
  }

  let handleDelete = (toRemove) => {
    let tempCart = cart.filter((item) => {
      return (item.sku !== toRemove.sku);
    })
    setCart(tempCart);
  }

  let handleModal = () => {
    console.log('Modal');
    setModalHeaderContent('Checkout');
    setModalBodyContent('Text');
    setShowModal(true);
  }


  useEffect(() => {
    getTotal();
    localStorage.setItem('cart', JSON.stringify(cart));
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
              <th>Remove</th>
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
                  <td onClick={() => {handleDelete(item)}}>❌</td>
                  <td>{item.name}</td>
                  <td>{item.style}</td>
                  <td>{item.size}</td>
                  <td>{item.quant}</td>
                  <td>{item.price * item.quant}</td>
                </tr>
              )
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      }
    </Container>
  )

}

export default CartDisplay;

