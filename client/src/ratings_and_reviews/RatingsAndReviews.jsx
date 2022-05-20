import React, { useState, useContext } from 'react';

import ReviewList from './ReviewList.jsx'

function RatingsAndReviews() {

  const RatingsAndReviewsStyles = {
    'display': 'flex',
  }

  return (
    <div className="RatingsAndReviews">
      <h3>Ratings and Reviews</h3>
      <ReviewList/>
    </div>
  );
}

export default RatingsAndReviews;