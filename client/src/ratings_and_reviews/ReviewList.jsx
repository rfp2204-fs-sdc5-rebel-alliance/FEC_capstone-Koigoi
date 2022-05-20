import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import ReviewListCard from './ReviewListCard.jsx'
import { ProdPageContext } from '../product_page.jsx';
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
  padding: 20px 10px;
`;

function ReviewList() {
  const [reviewListView, setReviewListView] = useState();
  const [reviews, setReviews] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const {prod_id} = useContext(ProdPageContext);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        page: pageCount,
        count: 2,
        sort: "newest",
        product_id: prod_id
      }
    })
    .then((reviews) => {setReviews(prevReviews => prevReviews.concat(reviews.data.results))})
    .then(() => {setPageCount(prevPageCount => prevPageCount + 1)})
    .catch((err) => console.log(err));
  }



  let moreReviewsButton = null;
  let noReviewsGreeting = null;

  if (reviews.length > 0) {
    moreReviewsButton = <button onClick={getReviews}>More Reviews</button>;
  } else if (!pageCount + 1) {
    moreReviewsButton = null;
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