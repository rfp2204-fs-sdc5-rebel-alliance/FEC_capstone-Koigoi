import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import ReviewListCard from './ReviewListCard.jsx'
import { ProdPageContext } from '../product_page.jsx';
import { ReviewsContext } from './RatingsAndReviews.jsx';
import styled from 'styled-components';

const ReviewListContainer = styled.div`
  background: #FFF;
  font-size: 18px;
`;

const ReviewCardContainer = styled.div`
max-height: 500px;
overflow: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  alignItems: center;
  padding: 20px 20px;
`;

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const { prod_id } = useContext(ProdPageContext);
  const { reviewCount, setReviewCount, ratingsTotal, sort, toggleSort, setToggleSort } = useContext(ReviewsContext);

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
    .then((reviews) => {setReviews(reviews.data.results)})
    .catch((err) => {console.log(err)})

  }, [sort, reviewCount]);

  const getReviews = () => {
    setToggleSort(false);
    setReviewCount(prevReviewCount => prevReviewCount + 2);
  }

  let moreReviewsButton = null;
  let noReviewsGreeting = null;

  if (reviewCount >= ratingsTotal) {
    moreReviewsButton = null;
  } else if (reviewCount > 0) {
    moreReviewsButton = <button onClick={getReviews}>More Reviews</button>;
  } else {
    noReviewsGreeting = <p>Be the first to review this product!</p>;
  }

  return (
    <ReviewListContainer>
      <ReviewCardContainer>
        {noReviewsGreeting}
        {reviews.map((review, index) =>
          <ReviewListCard
            key={index}
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
        <button>Add a Review</button>
      </ButtonContainer>
    </ReviewListContainer>
  );
}

export default ReviewList;