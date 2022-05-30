import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index.jsx';
import { ProdPageContext } from '../product_page.jsx';
import styled from 'styled-components';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 35%;
  border: 0.5rem solid red;
  justify-content: center;
  align-items: top;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
`;

const PayForm = () => {

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log('checkout submitted');

  }

  return (
    <Container>
      <h4>Payment Information</h4>
      <form onSubmit={handleSubmit}>
        <label>Card Number</label>
        <input placeholder="(dashes not required)" minLength="12" maxLength="19" required></input>
        <label>Name on Card</label>
        <input type="text" placeholder="Full Name" required></input>
        <label>Exp. Date</label>
        <input type="text" placeholder="MM/YY" required></input>
        <label>CVC</label>
        <input type="text" placeholder="***" maxLength={3} required></input>
        <ButtonContainer>
        <button type="submit">Checkout</button>
      </ButtonContainer>
      </form>

    </Container>
  )

}

export default PayForm;

