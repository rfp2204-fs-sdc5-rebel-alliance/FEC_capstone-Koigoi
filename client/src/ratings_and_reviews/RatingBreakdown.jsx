import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import StarRating from '../shared_components/StarRating.jsx';

import { ReviewsContext } from './RatingsAndReviews.jsx';

const AverageRating = styled.div`
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 45px;
`;

const RatingsStyle = styled.div`
  margin-left: 10px;
`

const RatingsBreakdown = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;

const RatingNumber = styled.button`
  min-width: 60px;
  background: none;
  border: none;
`;

const RatingNumberTotal = styled.div`
  margin-left: 1rem;
`;

const RatingBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: white;
`;

const RecommendedMessage = styled.div`
  text-align: right;
`;

function RatingBreakdown() {
  const { ratings, totalRatings, avgRating, recommended, numRating, setFilterNumRating } = useContext(ReviewsContext);

  const showRatingsObj = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }

  const [showRatings, setShowRatings] = useState(showRatingsObj);


  const handleRatingClick = (event) => {
    const starRating = event.target.value

    console.log(showRatings[starRating])

    // showRatings[starRating] ? setShowRatings[starRating](false) : setShowRatings[starRating](true);

    setFilterNumRating(prevFilter => prevFilter.concat(numRating[starRating]));
  }

  const individualRatingAvg = (rating, sum = 0) => {
    sum = ratings[rating] * rating;
    return Math.round((ratings[rating] / totalRatings) * 100);
  }

  let fiveStarAvg = {
    'width': `${individualRatingAvg(5)}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let fourStarAvg = {
    'width': `${individualRatingAvg(4)}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let threeStarAvg = {
    'width': `${individualRatingAvg(3)}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let twoStarAvg = {
    'width': `${individualRatingAvg(2)}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let oneStarAvg = {
    'width': `${individualRatingAvg(1)}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let recommendedPercentage = `${Math.round((recommended.true / totalRatings) * 100)}% of reviews recommend this product`;

  return (
    <div>
      <AverageRating>
        {avgRating}
        <RatingsStyle>{StarRating(avgRating)}</RatingsStyle>
      </AverageRating>
      <div>
        <p>Rating Breakdown</p>
        <RatingsBreakdown>
          <RatingNumber
            value={'5'}
            onClick={handleRatingClick}>
            5 stars
          </RatingNumber>
          <RatingBarContainer>
            <div style={fiveStarAvg}></div>
            <RatingNumberTotal>{ratings[5]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber
            value='4'
            onClick={handleRatingClick}>
            4 stars
          </RatingNumber>
          <RatingBarContainer>
            <div style={fourStarAvg}></div>
            <RatingNumberTotal>{ratings[4]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber
            value='3'
            onClick={handleRatingClick}>
            3 stars
          </RatingNumber>
          <RatingBarContainer>
            <div style={threeStarAvg}></div>
            <RatingNumberTotal>{ratings[3]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber
            value='2'
            onClick={handleRatingClick}>
            2 stars
          </RatingNumber>
          <RatingBarContainer>
            <div style={twoStarAvg}></div>
            <RatingNumberTotal>{ratings[2]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber
            value='1'
            onClick={handleRatingClick}>
            1 stars
          </RatingNumber>
          <RatingBarContainer>
            <div style={oneStarAvg}></div>
            <RatingNumberTotal>{ratings[1]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RecommendedMessage>{recommendedPercentage}</RecommendedMessage>
      </div>
    </div>
  );
}

export default RatingBreakdown;