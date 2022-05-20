import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import ReviewListCard from './ReviewListCard.jsx'
import { ProdPageContext } from '../product_page.jsx';

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


  const reviewListStyle = {
    'background': '#FFF',
    'fontSize': '18px',
  }

  const buttonStyles = {
    'display': 'flex',
    'alignItems': 'center',
    'padding': '20px 10px'
  }
  let moreReviewsButton = null;
  let noReviewsGreeting = null;

  if (reviews.length > 0) {
    moreReviewsButton = <button onClick={getReviews}>More Reviews</button>;
  } else if (reviews.length !== pageCount * 2) {
    moreReviewsButton = null;
  } else {
    noReviewsGreeting = <p>Be the first to review this product!</p>;
  }

  return (
    <div className="ReviewList" style={reviewListStyle}>
      {noReviewsGreeting}
      {reviews.map((review) =>
        <ReviewListCard
          key={review.review_id}
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
       <div className="ReviewListButtons" style={buttonStyles}>
      {moreReviewsButton}
      <button>Add a Review</button>
       </div>
    </div>
  );
}

export default ReviewList;