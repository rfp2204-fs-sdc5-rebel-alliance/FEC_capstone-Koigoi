import React from 'react';
import formattedDate from './formattedDate.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = styled.div`
  border-bottom: 1px solid black;
  margin: 0px 20px;
  padding: 20px 0px;
  font-weight: normal;
  font-size: 14px;
  `;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardSummary = styled.p`
font-weight: bold;
font-size: 18px;
`;


const CardResponse = styled.div`
  background: #F0F0F0;
`;

function ReviewListCard({ date, rating, reviewerName, summary, body, response, helpfulness, photos, recommend }) {

  if (summary.length > 60) {
    const summaryCopy = summary.slice(0,60);
    summary = summaryCopy + '...'
  }

  //need to create view more button for review body text


  let recommendMessage = null;
  if (recommend) {
    recommendMessage = <p><FontAwesomeIcon icon={faCheck}/> I recommend this product!</p>;
  }

  let reviewResponse = null;
  if (response) {(
    <div className='ReviewResponse' style={cardResponse}>
        <p>Response:</p>
        {response}
    </div>
  )}

  return (
    <ReviewCard>
      <CardHeader>
        <p>{rating} Stars</p>
        <CardHeader>
          <p>{reviewerName}, </p>
          {formattedDate(date)}
          </CardHeader>
      </CardHeader>
      <CardSummary>{summary}</CardSummary>
      <div className="CardBody">
        <p>{body}</p>
      </div>
      {recommendMessage}
      <CardResponse>
        {reviewResponse}
      </CardResponse>
      <p>Helpful? Yes {helpfulness}</p>
    </ReviewCard>
  );
}

export default ReviewListCard;