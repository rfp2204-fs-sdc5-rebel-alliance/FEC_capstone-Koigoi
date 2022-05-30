import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import styled from 'styled-components';

import { ProdPageContext } from '../product_page.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewSort from './ReviewSort.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
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
  const [apiCount, setApiCount] = useState(2);
  const [reviewCount, setReviewCount] = useState(2);

  const [sort, setSort] =  useState('relevant');

  const [numRating, setNumRating] = useState({});
  const [showRatings, setShowRatings] = useState({});
  const [filterNumRating, setFilterNumRating] = useState([])
  const [filtered, setFiltered] = useState(false);

  const [showCharacteristics, setShowCharacteristics] = useState({});
  const [showCharacteristicLabel, setShowCharacteristicLabel] = useState({});
  const [characteristicLabels, setCharacteristicLabels] = useState({});

  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const [recommended, setRecommended] = useState({});

  const [helpful, setHelpful] = useState(0);

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
        const ratings = reviewsData.data.ratings;
        setCharacteristics(reviewsData.data.characteristics)
        setRatings(reviewsData.data.ratings)
        setRecommended(reviewsData.data.recommended)
        setRatingsObj(sharedReviewsComponent(ratings));
        setApiCount(Number(ratings[1]) + Number(ratings[2]) + Number(ratings[3]) + Number(ratings[4]) + Number(ratings[5]));
      })
      .then(() => {
        setShowRatings({
          '1': false,
          '2': false,
          '3': false,
          '4': false,
          '5': false
        });
      })
      .catch((err) => {console.log(err)});
    }, []);

    console.log(apiCount)

    const totalRatings = ratingsObj.totalRatings;
    const avgRating = ratingsObj.avgRating;

    const removeFilters = () => {
      setFiltered(false);

      setFilterNumRating([]);

      setShowRatings({
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false
      });
    }

    const renderFilterRatings = () => {
      setFilterNumRating([]);

      Object.keys(showRatings).forEach((rating) => {
        if (showRatings[rating] === true) {
          setFilterNumRating(prevFilter => prevFilter.concat(numRating[rating]));
          setFiltered(true);
        }
      })
    }

  return (
    <ReviewsContext.Provider value={{ apiCount, reviewCount, setReviewCount, characteristics, ratings, totalRatings, avgRating, recommended, sort, setSort, numRating, setNumRating, filterNumRating, setFilterNumRating, showRatings, setShowRatings, filtered, setFiltered, helpful, setHelpful, showCharacteristics, setShowCharacteristics, characteristicLabels, setCharacteristicLabels, showCharacteristicLabel, setShowCharacteristicLabel}}>
      <RatingsAndReviewsContainer>
        <h2 id="RatingsAndReviews">Ratings and Reviews</h2>
        <RatingsAndReviewsLayout>
          <LayoutLeft>
            <RatingBreakdown removeFilters={removeFilters} renderFilterRatings={renderFilterRatings}/>
            <br></br>
            <ProductBreakdown/>
          </LayoutLeft>
          <LayoutRight>
            <ReviewSort/>
            <br/>
            <ReviewList removeFilters={removeFilters} renderFilterRatings={renderFilterRatings}/>
          </LayoutRight>
        </RatingsAndReviewsLayout>
      </RatingsAndReviewsContainer>
    </ReviewsContext.Provider>
  );
}

export default RatingsAndReviews;