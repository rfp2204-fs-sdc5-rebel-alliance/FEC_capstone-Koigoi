import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ReviewsContext } from './RatingsAndReviews.jsx';

const AverageRating = styled.div`
  font-weight: 800;
  font-size: 45px;
`;

const RatingsBreakdown = styled.div`
  display: flex;
  margin: 10px 0px;
`;

const RatingNumber = styled.div`
  width: 5%;
`;

const RatingNumberTotal = styled.div`
  margin-left: 1%;
`;

const RatingBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: white;
`;

function RatingBreakdown() {
  const { ratings, ratingsTotal } = useContext(ReviewsContext);

  let ratingsSum = 0;
  let eachRatingsAverage = {};

  Object.keys(ratings).forEach((rating) => {
    ratingsSum += (ratings[rating] * (rating));
    eachRatingsAverage[rating] = Math.round((ratings[rating] / ratingsTotal) * 100)
  })

  const averageRating = Math.round((ratingsSum / ratingsTotal) * 10) / 10;

  let fiveStarAvg = {
    'width': `${eachRatingsAverage[5]}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let fourStarAvg = {
    'width': `${eachRatingsAverage[4]}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let threeStarAvg = {
    'width': `${eachRatingsAverage[3]}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let twoStarAvg = {
    'width': `${eachRatingsAverage[2]}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  let oneStarAvg = {
    'width': `${eachRatingsAverage[1]}%`,
    'height': '30px',
    'backgroundColor': 'black'
  }

  return (
    <div>
      <AverageRating>
        {averageRating} <span style={{'fontWeight': 'bold', 'font-size': '18px'}}>stars</span>
      </AverageRating>
      <div>
        <p>Rating Breakdown</p>
        <RatingsBreakdown>
          <RatingNumber>5 stars</RatingNumber>
          <RatingBarContainer>
            <div style={fiveStarAvg}></div>
            <RatingNumberTotal>{ratings[5]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber>4 stars</RatingNumber>
          <RatingBarContainer>
            <div style={fourStarAvg}></div>
            <RatingNumberTotal>{ratings[4]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber>3 stars</RatingNumber>
          <RatingBarContainer>
            <div style={threeStarAvg}></div>
            <RatingNumberTotal>{ratings[3]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber>2 stars</RatingNumber>
          <RatingBarContainer>
            <div style={twoStarAvg}></div>
            <RatingNumberTotal>{ratings[2]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
        <RatingsBreakdown>
          <RatingNumber>1 stars</RatingNumber>
          <RatingBarContainer>
            <div style={oneStarAvg}></div>
            <RatingNumberTotal>{ratings[1]}</RatingNumberTotal>
          </RatingBarContainer>
        </RatingsBreakdown>
      </div>
    </div>
  );
}

export default RatingBreakdown;