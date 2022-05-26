import React, { useState, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import formattedDate from '../shared_components/formattedDate.js';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ImageThumbnail from '../shared_components/ImageThumbnail.jsx';
import { ReviewsContext } from './RatingsAndReviews.jsx';


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

const ReviewImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


const CardResponse = styled.div`
  background: #F0F0F0;
`;

function ReviewListCard({ id, date, rating, reviewerName, summary, body, response, helpfulness, photos, recommend }) {
  const [showMore, setShowMore] = useState(false);
  // const { helpful, setHelpful, notHelpful, setNotHelpful } = useContext(ReviewsContext);

  if (summary.length > 60) {
    const summaryCopy = summary.slice(0,60);
    summary = summaryCopy + '...'
  }

  let renderedBody = body.slice(0, 250);

  const showMoreButton = () => {
    if (!showMore) {
      return null;
    } else {
      return (
        <button
          onClick={handleShowMore}>
          Show More
        </button>
      );
    }
  }

  if (body.length > 250) {
    setShowMore(true);
  }

  const handleShowMore = () => {
    setShowMore(false);
    renderedBody = body;
  }

  const recommendMessage = () => {
    if (recommend) {
      return <p><FontAwesomeIcon icon={faCheck}/> I recommend this product!</p>
    } else {
      return null;
    }
  }

  const reviewResponse = () => {
    if (response) {
      return (
      <CardResponse>
          <p>Response:</p>
          <p>{response}</p>
      </CardResponse>
      );
    } else {
      return null;
    }

  }

  const handleHelpfulClick = () => {
    // helpful ? setHelpful(false) : setHelpful(true);

    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`, {}, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then(() => {console.log('Success')})
    .catch((err) => {
      console.log(err)
      console.log(id)
      console.log(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`)
    })
  }

  return (
    <ReviewCard>
      <CardSummary>{reviewerName}</CardSummary>
      <br></br>
      <p>{rating} Stars</p>
      {formattedDate(date)}
      <br></br>
      <br></br>
      <CardSummary>{summary}</CardSummary>
      <div className="CardBody">
        <p>{renderedBody}</p>
        {showMoreButton()}
        <ImageThumbnail images={photos}/>
      </div>
      {recommendMessage()}
      <br></br>
      {reviewResponse()}
      <p>Was this review helpful? Yes <span onClick={handleHelpfulClick}>( {helpfulness} )</span></p>
    </ReviewCard>
  );
}

export default ReviewListCard;