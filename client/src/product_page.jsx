import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import { AppContext } from './index.jsx';
import ProductDetails from './product_details/ProductDetails.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';
import RelatedItems from './related_items/RelatedItems.jsx';
import QuestionList from './q_and_a/QuestionList.jsx';

export const ProdPageContext = createContext();

const ProductPage = () => {
  const { prod_id, setProd, cart, setCart, showModal, setShowModal, modalBodyContent, setModalBodyContent, modalHeaderContent, setModalHeaderContent } = useContext(AppContext);
  //const [prod_id, setProd] = useState(40344);
  const [prod_name, setProdName] = useState('');
  const [ratingsObj, setRatingsObj] = useState({});
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  return (
    <div>
      <ProdPageContext.Provider value={{ cart, setCart, showModal, setShowModal, modalBodyContent, setModalBodyContent, modalHeaderContent, setModalHeaderContent, prod_id, setProd, prod_name, setProdName, ratingsObj, setRatingsObj, totalRatings, setTotalRatings, averageRating, setAverageRating }}>
        <h1>This is a Product Page</h1>
        {/* Add components you want to render here */}
        <ProductDetails />
        <RelatedItems />
        <QuestionList />
        <RatingsAndReviews />
      </ProdPageContext.Provider>
    </div>
  )
}

export default ProductPage;