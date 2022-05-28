import React, { useState, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import formattedDate from '../shared_components/formattedDate.js';
import StarRating from '../shared_components/StarRating.jsx';
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

const ReviewCardSection = styled.div`
margin: 10px 0px;
`;

const Bold = styled.p`
font-weight: bold;
font-size: 18px;
`;

const ReviewImageContainer = styled.div`
  margin-top: 10px;
`;

const CardResponse = styled.div`
  background: #F0F0F0;
`;

function ReviewListCard({ id, date, rating, reviewerName, summary, body, response, helpfulness, photos, recommend }) {
  const [showMore, setShowMore] = useState(false);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const { helpful, setHelpful } = useContext(ReviewsContext);

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
    if (clickedHelpful) {
      return;
    }

    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`, {}, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then(() => {setHelpful(prevHelpful => prevHelpful + 1)})
    .then(() => {setClickedHelpful(true)})
    .catch((err) => {
      console.log(err)
      console.log(id)
      console.log(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`)
    })
  }

  return (
    <ReviewCard>
      <Bold>{reviewerName}</Bold>
      <ReviewCardSection>
        {StarRating(rating)}
        {formattedDate(date)}
      </ReviewCardSection>
      <Bold>{summary}</Bold>
        <p>{renderedBody}</p>
        {showMoreButton()}
        <ReviewImageContainer>
          <ImageThumbnail images={photos}/>
        </ReviewImageContainer>
      <ReviewCardSection>
        {recommendMessage()}
      </ReviewCardSection>
      {reviewResponse()}
      <p>Was this review helpful? Yes <span onClick={handleHelpfulClick}>( {helpfulness} )</span></p>
    </ReviewCard>
  );
}

export default ReviewListCard;