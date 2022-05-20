import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import styled from 'styled-components';

import { ProdPageContext } from '../product_page.jsx';
import ReviewList from './ReviewList.jsx'
import ReviewSort from './ReviewSort.jsx'

export const ReviewsMetaContext = createContext();

const RatingsAndReviewsContainer = styled.div`
  font-weight: normal;
  font-size: 18px;
`;

function RatingsAndReviews() {
  const [characteristics, setCharacteristics] = useState({});
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});
  const [sort, setSort] =  useState('relevance');

  const { prod_id } = useContext(ProdPageContext);

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

  return (
    <ReviewsMetaContext.Provider value={{ characteristics, ratings, recommended, sort, setSort }}>
      <RatingsAndReviewsContainer>
        <h3>Ratings and Reviews</h3>
        <ReviewSort/>
        <br></br>
        <ReviewList/>
      </RatingsAndReviewsContainer>
    </ReviewsMetaContext.Provider>
  );
}

export default RatingsAndReviews;