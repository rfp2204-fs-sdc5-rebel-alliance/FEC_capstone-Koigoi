import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import styled from 'styled-components';
import axios from 'axios';
import { AppContext } from './index.jsx';

const Checkout = () => {
  const { cart, setCart, showModal, setShowModal, modalBodyContent, setModalBodyContent, modalHeaderContent, setModalHeaderContent } = useContext(AppContext);

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
        <h1>Cart Here</h1>
      </MainWrapper>
    </>
  )
}

export default Checkout;