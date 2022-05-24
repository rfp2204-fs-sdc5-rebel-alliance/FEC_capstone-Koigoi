import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import axios from 'axios';
import { AppContext } from './index.jsx';

import ProductDetails from './product_details/ProductDetails.jsx';
import RatingsAndReviews, { ReviewsContext } from './ratings_and_reviews/RatingsAndReviews.jsx';

export const ProdPageContext = createContext();

const ProductPage = () => {
  const { cart, setCart, showModal, setShowModal } = useContext(AppContext);
  const [prod_id, setProd] = useState(40344);
  // const { totalRatings } = useContext(ReviewsContext);

  // console.log(totalRatings)

  return (
    <div>
      <ProdPageContext.Provider value={{ cart, setCart, showModal, setShowModal, prod_id, setProd }}>
        <h1>This is a Product Page</h1>
        {/* Add components you want to render here */}
        <ProductDetails />
        <RatingsAndReviews />
      </ProdPageContext.Provider>
    </div>
  )
}

export default ProductPage;