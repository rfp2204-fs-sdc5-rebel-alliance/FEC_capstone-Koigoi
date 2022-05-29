import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import styled from 'styled-components';

import ReviewListCard from './ReviewListCard.jsx';
import AddReviewForm from './AddReviewForm.jsx';

import { ProdPageContext } from '../product_page.jsx';
import { ReviewsContext } from './RatingsAndReviews.jsx';

const ReviewListContainer = styled.div`
  background: #FFF;
  font-size: 18px;
`;

const ReviewCardContainer = styled.div`
max-height: 600px;
overflow: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  alignItems: center;
  padding: 20px 20px;
`;

function ReviewList({ removeFilters, renderFilterRatings }) {
  const [reviews, setReviews] = useState([]);
  const { prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);
  const { reviewCount, setReviewCount, totalRatings, sort, toggleSort, setToggleSort, numRating, setNumRating, showRatings, setShowRatings, filterNumRating, showFilterMessage, helpful, setHelpful, characteristics, characteristicLabels } = useContext(ReviewsContext);

  //if showFilterMessage is true
    //check to make sure FilterNumRating has two or more reviews
      //if it does, render reviews from FilterNumRating
      //if not, add two to reviewCount
    //conditionally render remove filter button where more reviews button is
    //else if showFilterMessage is false
      //do axios get request

  useEffect(() => {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`, {
        headers: {
          Authorization: config.TOKEN
        },
        params: {
          page: 1,
          count: reviewCount,
          sort: sort,
          product_id: prod_id
        }
      })
      .then((reviews) => {
        setReviews(reviews.data.results)
        filterNumRatings(reviews.data.results)
      })
      .then(() => {test()})
      .catch((err) => {console.log(err)})
  }, [sort, reviewCount, helpful, filterNumRating]);

  const test = () => {
    if (showFilterMessage === true) {
      // if (filterNumRating.length >= 2) {
      //   console.log('hi')
        setReviews(filterNumRating)
      // } else {
      //   getReviews();
      //   renderFilterRatings();
      // }
    }
  }
  const getReviews = () => {
    setToggleSort(false);
    setReviewCount(prevReviewCount => prevReviewCount + 2);
  }

  const filterNumRatings = (reviews) => {
    let numRatingObj = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }

    reviews.forEach((review) => {
      numRatingObj[review.rating].push(review);
    })
    setNumRating(numRatingObj);
  }

  let moreReviewsButton = null;
  let noReviewsGreeting = null;

  if (showFilterMessage === true && reviews.length > 0) {
    moreReviewsButton = <button onClick={removeFilters}>Remove filter</button>
  } else if (showFilterMessage === true && reviews.length === 0) {
    noReviewsGreeting = <p>There are currently no reviews with this filter. Please remove filter and add additional reviews.</p>;
    moreReviewsButton = <button onClick={removeFilters}>Remove filter</button>
  } else if (reviewCount >= totalRatings) {
    moreReviewsButton = null;
  } else if (reviewCount > 0) {
    moreReviewsButton = <button onClick={getReviews}>More Reviews</button>;
  } else {
    noReviewsGreeting = <p>Be the first to review this product!</p>;
  }

  const handleModal = () => {
    setModalHeaderContent('Write Your Review')
    setModalBodyContent(<AddReviewForm prodId={prod_id} productName={prod_name} characteristics={characteristics} characteristicLabels={characteristicLabels}/>);
    setShowModal(true);
  }

  return (
    <ReviewListContainer>
      <ReviewCardContainer>
        {noReviewsGreeting}
        {reviews.map((review, index) =>
          <ReviewListCard
            key={index}
            index={index}
            id={review.review_id}
            date={review.date}
            rating={review.rating}
            reviewerName={review.reviewer_name}
            summary={review.summary}
            body={review.body}
            response={review.response}
            helpfulness={review.helpfulness}
            photos={review.photos}
            recommend={review.recommend}
          />
        )}
      </ReviewCardContainer>
      <ButtonContainer>
        {moreReviewsButton}
        <button onClick={handleModal}>Add a Review</button>
      </ButtonContainer>
    </ReviewListContainer>
  );
}

export default ReviewList;