import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index.jsx';
import styled from 'styled-components';

//may need to import more stuff to begin work

const Container = styled.div`
  border-bottom: 0.1rem solid gray;
  display: flex;
  width: 100%;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  margin: 1rem;
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
`;

const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QuantContainer = styled.div`
  width: 30%;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SelectStyle = styled.select`
  display: flex;
  appearance: none;
  width: 6rem;
  border-radius: 1rem;
  text-align: center;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const CartItem = ({item}) => {
  const {cart, setCart} = useContext(AppContext);

  let handleDelete = (toRemove) => {
    let tempCart = cart.filter((item) => {
      return (item.sku !== toRemove.sku);
    })
    setCart(tempCart);
  }

  let onSelectQuant = (newQuant) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].sku === item.sku) {
        let tempArray = [...cart];
        tempArray[i].quant = Number(newQuant);
        setCart(tempArray);
        return;
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  return (
    <Container>
      <ImgContainer>
        <ImgStyle src={item.image} alt="No Image" />
      </ImgContainer>
      <InfoContainer>
        <div>{item.name}</div>
        <div>{item.style}</div>
        <div>{item.size}</div>
        <div>${Math.trunc(item.price)}</div>
      </InfoContainer>
      <QuantContainer>
        <div>${Math.trunc(item.price * item.quant)}</div>
        <SelectContainer>
          <SelectStyle defaultValue={item.quant} onChange={() => {onSelectQuant(event.target.value)}}>
            {
              item.quantOptions.map((quant, index) => {
                if (quant === item.quant) {
                  return (
                    <option key={index} value={quant}>{quant}</option>
                  )
                }
                return (
                  <option key={index} value={quant}>{quant}</option>
                )
              })
            }
          </SelectStyle>
        </SelectContainer>
        <div style={{'marginTop': '1rem', 'marginRight': '1rem'}} onClick={() => {handleDelete(item)}}>❌</div>
      </QuantContainer>
    </Container>
  )

}

export default CartItem;