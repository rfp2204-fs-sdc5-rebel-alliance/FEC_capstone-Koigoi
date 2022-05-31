import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import styled from 'styled-components';

import ReviewListCard from './ReviewListCard.jsx';
import AddReviewForm from './AddReviewForm.jsx';

import { ProdPageContext } from '../product_page.jsx';
import { ReviewsContext } from './RatingsAndReviews.jsx';

const ReviewListContainer = styled.div`
  background: #FFF;
  font-size: 18px;
`;

const ReviewCardContainer = styled.div`
max-height: 600px;
max-width: 100%;
overflow: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  alignItems: center;
  padding: 20px 20px;
`;

function ReviewList({ removeFilters, renderFilterRatings }) {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([])
  const [filterRatingsCount, setFilterRatingsCount] = useState(10);
  const { prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent, totalRatings, setTotalRatings, setAverageRating } = useContext(ProdPageContext);
  const { apiCount, reviewCount, setReviewCount, sort, ratings, setRatings, numRating, setNumRating, filterNumRating, filtered, helpful, characteristics, characteristicLabels, showCharacteristicLabel, setShowCharacteristicLabel, setRecommended } = useContext(ReviewsContext);

  useEffect(() => {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`, {
        headers: {
          Authorization: config.TOKEN
        },
        params: {
          page: 1,
          count: apiCount,
          sort: sort,
          product_id: prod_id
        }
      })
      .then((reviews) => {
        setAllReviews(reviews.data.results)
        setTotalRatings(reviews.data.results.length);
        filterNumRatings(reviews.data.results)
      })
      .catch((err) => {console.log(err)})
  }, [apiCount, sort, helpful, totalRatings]);

  useEffect(() => {

    if (filtered === true) {
        setReviews(filterNumRating.slice(0, filterRatingsCount))
    } else {
      setReviews(allReviews.slice(0, reviewCount))
    }
  }, [reviewCount, filterRatingsCount, allReviews, filtered])

  const getReviews = () => {
    if (filtered === true) {
      setFilterRatingsCount(prevReviewCount => prevReviewCount + 2)
    } else {
      setFilterRatingsCount(10);
      setReviewCount(prevReviewCount => prevReviewCount + 2);
    }
  }

  const filterNumRatings = (reviews) => {
    let numRatingObj = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }

    let recommended = {
      true: 0,
      false: 0
    }

    let averageRating = 0;

    reviews.forEach((review) => {
      numRatingObj[review.rating].push(review);
      recommended[review.recommend] += 1;
      averageRating += review.rating;
    })

    const ratingsCount = {
      1: numRatingObj[1].length,
      2: numRatingObj[2].length,
      3: numRatingObj[3].length,
      4: numRatingObj[4].length,
      5: numRatingObj[5].length
    }

    setAverageRating(Math.round((averageRating / totalRatings) * 10) / 10);
    setNumRating(numRatingObj);
    setRatings(ratingsCount);
    setRecommended(recommended);
  }

  let moreReviewsButton = null;
  let noReviewsGreeting = null;

   if (reviewCount >= totalRatings) {
    moreReviewsButton = null;
  } else if (reviewCount > 0) {
    moreReviewsButton = <button onClick={() => {getReviews()}}>More Reviews</button>;
  } else {
    noReviewsGreeting = <p>Be the first to review this product!</p>;
  }

  const handleModal = () => {
    setModalHeaderContent('Write Your Review')
    setModalBodyContent(<AddReviewForm prodId={prod_id} productName={prod_name} characteristics={characteristics} characteristicLabels={characteristicLabels} showCharacteristicLabel={showCharacteristicLabel} setShowCharacteristicLabel={setShowCharacteristicLabel}/>);
    setShowModal(true);
  }

  return (
    <ReviewListContainer>
      <ReviewCardContainer>
        {noReviewsGreeting}
        {reviews.map((review, index) =>
          <ReviewListCard
            key={index}
            index={index}
            id={review.review_id}
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
        <button onClick={() => {handleModal()}}>Add a Review</button>
      </ButtonContainer>
    </ReviewListContainer>
  );
}

export default ReviewList;