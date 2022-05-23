import React, { useState, createContext, useContext, useEffect } from "react";
import { render } from "react-dom";
import axios from 'axios';
import config from './../dist/config.js';
import { AppContext } from './index.jsx';

import ProductDetails from './product_details/ProductDetails.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';

export const ProdPageContext = createContext();

const ProductPage = ( {totalRatings = 0} ) => {
  const { cart, setCart } = useContext(AppContext);
  const [prod_id, setProd] = useState(40344);
  const [characteristics, setCharacteristics] = useState({});
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});


  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta`, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        product_id: prod_id
      }
    })
    .then((reviewsData) => {
      setCharacteristics(reviewsData.data.characteristics)
      setRatings(reviewsData.data.ratings)
      setRecommended(reviewsData.data.recommended)
    })
    .catch((err) => {console.log(err)});
  }, []);

  Object.keys(ratings).forEach((value) => {
    totalRatings += Number(ratings[value]);
  })

  return (
    <div>
      <ProdPageContext.Provider value={{ cart, setCart, prod_id, setProd, ratings, totalRatings, characteristics, recommended }}>
        <h1>This is a Product Page</h1>
        {/* Add components you want to render here */}
        <ProductDetails />
        <RatingsAndReviews />
      </ProdPageContext.Provider>
    </div>
  )
}

export default ProductPage;