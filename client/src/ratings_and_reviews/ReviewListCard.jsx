import React from 'react';

function ReviewListCard({ date, rating, reviewerName, summary, body, response, helpfulness, photos, recommend }) {

  if (summary.length > 60) {
    const summaryCopy = summary.slice(0,60);
    summary = summaryCopy + '...'
  }

  //need to create view more button for review body text

  const reviewCardStyle = {
    'borderBottom': '1px solid black',
    'margin': '10px 10px',
    'padding': '10px',
    'fontWeight': 'normal'
  };

  const cardHeader = {
    'display': 'flex',
    'justifyContent': 'space-between'
  }

  const cardSummary = {
    'fontWeight': 'bold'
  }

  const cardResponse = {
    'background': '#F0F0F0'
  }

  let recommendMessage = null;
  if (recommend) {
    recommendMessage = <p>I recommend this product!</p>;
  }

  let reviewResponse = null;
  if (response) {(
    <div className='ReviewResponse' style={cardResponse}>
        <p>Response:</p>
        {response}
    </div>
  )}

  return (
    <div className="ReviewCard" style={reviewCardStyle}>
      <div className="ReviewCardHeader" style={cardHeader}>
        <p>{rating} Stars</p>
        <div style={cardHeader}>
          <p>{reviewerName}, </p>
          <p>{date}</p>
        </div>
      </div>
      <p style={cardSummary}>{summary}</p>
      <div className="CardBody">
        <p>{body}</p>
      </div>
      {recommendMessage}
      {reviewResponse}
      <p>Helpful? Yes {helpfulness}</p>
    </div>
  );
}

export default ReviewListCard;