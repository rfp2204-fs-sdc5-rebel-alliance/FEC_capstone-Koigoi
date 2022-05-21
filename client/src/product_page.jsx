import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import axios from 'axios';
import { AppContext } from './index.jsx';
import ProductDetails from './product_details/ProductDetails.jsx';
import QuestionList from './q_and_a/QuestionList.jsx';

export const ProdPageContext = createContext();

const ProductPage = () => {
  const { cart, setCart } = useContext(AppContext);
  const [prod_id, setProd] = useState(40344);

  return (
    <div>
      <ProdPageContext.Provider value={{ cart, setCart, prod_id, setProd }}>
        <h1>This is a Product Page</h1>
        {/* Add components you want to render here */}
        <ProductDetails />
        <QuestionList />
      </ProdPageContext.Provider>
    </div>
  )
}

export default ProductPage;