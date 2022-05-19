import React from 'react';

function ReviewListCard(props) {

  const reviewCardStyle = {
    'background': '#F0F0F0',
    'fontSize': '18px',
    'margin': '10px 0px',
    'borderRadius': '5px',
    'padding': '10px'
  };

  return (
    <div className="ReviewCard" style={reviewCardStyle}>
      <p>Rating: {props.rating} Stars</p>
      <p>Name: {props.reviewerName}</p>
      <p>Summary: {props.summary}</p>
      <p>Body: {props.body}</p>
    </div>
  );
}

export default ReviewListCard;