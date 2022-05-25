import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import styled from 'styled-components';

import { ProdPageContext } from '../product_page.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewSort from './ReviewSort.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';

export const ReviewsContext = createContext();

const RatingsAndReviewsContainer = styled.div`
  font-weight: normal;
  font-size: 14px;
`;

const RatingsAndReviewsLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LayoutLeft = styled.div`
  flex: 0 0 20rem;
  margin-right: 2rem;
`

const LayoutRight = styled.div`
  flex-grow: 2;
  margin-left: 2rem;
`

function RatingsAndReviews() {
  const [reviewCount, setReviewCount] = useState(2);
  const [characteristics, setCharacteristics] = useState({});
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});
  const [sort, setSort] =  useState('relevance');
  const [toggleSort, setToggleSort] = useState(true);

  const { prod_id, ratingsObj, setRatingsObj } = useContext(ProdPageContext);

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
        setRatingsObj(sharedReviewsComponent(reviewsData.data.ratings));
      })
      .then(() => {
      })
      .catch((err) => {console.log(err)});
    }, []);

    const totalRatings = ratingsObj.totalRatings;
    const avgRating = ratingsObj.avgRating;

  return (
    <ReviewsContext.Provider value={{ reviewCount, setReviewCount, characteristics, ratings, totalRatings, avgRating, recommended, sort, setSort, toggleSort, setToggleSort }}>
      <RatingsAndReviewsContainer>
        <h2 id="RatingsAndReviews">Ratings and Reviews</h2>
        <RatingsAndReviewsLayout>
          <LayoutLeft>
            <RatingBreakdown/>
          </LayoutLeft>
          <LayoutRight>
            <ReviewSort/>
            <br/>
            <ReviewList/>
          </LayoutRight>
        </RatingsAndReviewsLayout>
      </RatingsAndReviewsContainer>
    </ReviewsContext.Provider>
  );
}

export default RatingsAndReviews;