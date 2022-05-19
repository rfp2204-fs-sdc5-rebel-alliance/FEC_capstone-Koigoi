import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import ReviewListCard from './ReviewListCard.jsx'
import { ProdPageContext } from '../product_page.jsx';

function ReviewList() {
  // const [reviewListView, setReviewListView] = useState(ReviewsView)
  const [reviews, setReviews] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const {prod_id} = useContext(ProdPageContext);

  useEffect(() => {
    getReviews();
  }, []);

  // const ReviewsView = (
  //   <p>Be the first to submit a review!</p>
  // )

  // if (reviews.length > 0) {

  // }

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

  return (
    <div className="ReviewList">
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
      <button onClick={getReviews}>More Reviews</button>
      <button>Add a Review</button>
    </div>
  );
}

export default ReviewList;