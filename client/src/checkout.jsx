import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import axios from 'axios';
import { AppContext } from './index.jsx';

const Checkout = () => {
  const { cart, setCart } = useContext(AppContext);

  return (
    <div>
      <h1>This is a Checkout Page</h1>
    </div>
  )
}

export default Checkout;