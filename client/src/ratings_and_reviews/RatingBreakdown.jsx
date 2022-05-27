import React, { useState, useEffect, useContext } from 'react';
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

const StarFilterMessage = styled.div`
`;

const RatingNumber = styled.button`
  min-width: 60px;
  border: none;
  background: none;
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
  const { ratings, totalRatings, avgRating, recommended, numRating, filterNumRating, setFilterNumRating, showRatings, setShowRatings } = useContext(ReviewsContext);
  const [showFilterMessage, setShowFilterMessage] = useState(false);

  console.log('FILTERED ARRAY',filterNumRating);

  const handleRatingClick = (event) => {
    const starRating = event.target.value;
    const updateShowRatingObj = showRatings;

    console.log('SHOW RATINGS', showRatings)

    showRatings[starRating] ? updateShowRatingObj[starRating] = false : updateShowRatingObj[starRating] = true;

    setShowRatings(updateShowRatingObj);

    renderFilterRatings();
  }

  const renderFilterRatings = () => {
    setFilterNumRating([]);
    setShowFilterMessage(false);

    Object.keys(showRatings).forEach((rating) => {
      if (showRatings[rating] === true) {
        setFilterNumRating(prevFilter => prevFilter.concat(numRating[rating]));
        setShowFilterMessage(true);
      }
    })
  }

  const renderFilterMessage = () => {

    if (!showFilterMessage) {
      return null;
    }

    let starFilters = [];

    Object.keys(showRatings).forEach((rating) => {
      if (showRatings[rating] === true) {
        starFilters.push(rating + ' Stars');
      }
    })

    if (starFilters.length > 1) {
      starFilters = starFilters.join(', ')
    }

    return (
      <StarFilterMessage>
        <h4>Currently filtering:</h4>
        {starFilters}
        <div onClick={() => {console.log('Remove Filters')}}>Remove Filters</div>
      </StarFilterMessage>
    )
  }

  const removeFilters = () => {

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
        {avgRating} <span style={{'fontWeight': 'bold', 'fontSize': '18px'}}>stars</span>
      </AverageRating>
      <div>
        <h3>Rating Breakdown</h3>
        {renderFilterMessage()}
        <RatingsBreakdown>
          <RatingNumber
            value='5'
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