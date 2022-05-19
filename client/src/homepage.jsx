import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import axios from 'axios';
import { AppContext } from './index.jsx';

export const ProdPageContext = createContext();

const HomePage = () => {
  const { cart, setCart } = useContext(AppContext);

  return (
    <div>
      <h1>This is a HomePage</h1>
    </div>
  )
}

export default HomePage;