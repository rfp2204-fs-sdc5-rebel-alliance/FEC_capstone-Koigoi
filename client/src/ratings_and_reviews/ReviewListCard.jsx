import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ImageThumbnail from '../shared_components/ImageThumbnail.jsx';
import StarRating from '../shared_components/StarRating.jsx';
import formattedDate from '../shared_components/formattedDate.js';
import { ReviewsContext } from './RatingsAndReviews.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = styled.div`
  max-width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  margin: 0px 20px;
  padding: 20px 0px;
  font-weight: normal;
  font-size: 14px;
  word-break: break-word;
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

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.fontColor};
  margin: 1rem 2rem 1rem 0;
  background: #FFF;

  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const HelpfulReview = styled.span`
  cursor: pointer;
`;

const ReviewListCard = ({ id, date, rating, reviewerName, summary, body, response,
  helpfulness, photos, recommend, productId }) => {
  const [renderedSummary, setRenderedSummary] = useState(summary);
  const [renderedBody, setRenderedBody] = useState(body);
  const [showMore, setShowMore] = useState(false);
  const { helpful, setHelpful } = useContext(ReviewsContext);
  const [windowLocalStorage, setWindowLocalStorage] = useState(
    JSON.parse(localStorage.getItem('helpfulReviews')) ? JSON.parse(localStorage.getItem('helpfulReviews')) : []
  );

  useEffect(() => {
    if (summary.length > 60) {
      setRenderedSummary(`${summary.slice(0,60)}...`);
    } else {
      setRenderedSummary(summary);
    }

    if (body.length > 250) {
      setRenderedBody(body.slice(0, 250));
      setShowMore(true);
    } else {
      setRenderedBody(body);
      setShowMore(false);
    }
  }, [summary, body]);

  const showMoreButton = () => {
    if (!showMore) {
      return null;
    } else {
      return (
        <Button
          onClick={() => handleShowMore()}>
          Show More
        </Button>
      );
    }
  }

  const handleShowMore = () => {
    setShowMore(false);
    setRenderedBody(body);
  };

  const recommendMessage = () => {
    if (recommend) {
      return <p><FontAwesomeIcon icon={faCheck}/> I recommend this product!</p>;
    } else {
      return null;
    }
  };

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
  };

  const handleHelpfulClick = () => {
    const reviewData = {
      productId,
      id
    };
    let helpfulReviews = windowLocalStorage.slice();
    let doesPrevClickExist = helpfulReviews.filter((review) => review.id === id);

    if (doesPrevClickExist.length > 0) {
      return;
    } else {
      helpfulReviews.push(reviewData);

      axios.put(`/FEC/reviews/${id}/helpful`, {})
        .then(() => setHelpful(prevHelpful => prevHelpful + 1))
        .then(() => {
          localStorage.setItem('helpfulReviews', JSON.stringify(helpfulReviews));
          setWindowLocalStorage(helpfulReviews);
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <ReviewCard>
      <Bold>{reviewerName}</Bold>
      <ReviewCardSection>
        {StarRating(rating)}
        {formattedDate(date)}
      </ReviewCardSection>
      <Bold>{renderedSummary}</Bold>
        <p>{renderedBody}</p>
        {showMoreButton()}
        <ReviewImageContainer>
          <ImageThumbnail images={photos}/>
        </ReviewImageContainer>
      <ReviewCardSection>
        {recommendMessage()}
      </ReviewCardSection>
      {reviewResponse()}
      <p>Was this review helpful?&nbsp;
        <HelpfulReview onClick={() => handleHelpfulClick()}>
          <u>Yes</u> ( {helpfulness} )
        </HelpfulReview>
      </p>
    </ReviewCard>
  );
}

export default ReviewListCard;