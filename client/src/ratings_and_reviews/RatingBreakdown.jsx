import React, { useContext } from 'react';
import StarRating from '../shared_components/StarRating.jsx';
import { AppContext } from '../index.jsx';
import { ProdPageContext } from '../product_page.jsx';
import { ReviewsContext } from './RatingsAndReviews.jsx';

import styled from 'styled-components';

const AverageRating = styled.div`
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 45px;
`;

const AverageRatingStars = styled.span`
  margin-left: 10px;
`;

const RatingsBreakdown = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;

const RemoveFiltersButton = styled.button`
  background: none;
  border: none;
  margin-left: 5px;
  padding: 0px;
  cursor: pointer;
`;

const RatingNumber = styled.button`
  width: 60px;
  border: none;
  background: none;
  padding: 0px;
  margin-right: 10px;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

const RatingNumberTotal = styled.div`
  width: 35px;
  margin-left: 10px;
  text-align: right;
`;

const RatingBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid ${(props) => props.theme.fontColor};;
`;

const RecommendedMessage = styled.div`
  text-align: right;
`;

const RatingBreakdown = ({ removeFilters, renderFilterRatings }) => {
  const { ratings, recommended, showRatings, setShowRatings, filtered } = useContext(ReviewsContext);
  const { averageRating, totalRatings } = useContext(ProdPageContext);
  const { theme } = useContext(AppContext);

  const handleRatingClick = (event) => {
    const starRating = event.target.value;
    const updateShowRatingObj = showRatings;

    showRatings[starRating] ? updateShowRatingObj[starRating] = false : updateShowRatingObj[starRating] = true;

    setShowRatings(updateShowRatingObj);
    renderFilterRatings();
  };


  const renderFilterMessage = () => {

    if (!filtered) {
      return null;
    }

    let starFilters = [];

    Object.keys(showRatings).forEach((rating) => {
      if (showRatings[rating] === true) {
        starFilters.push(rating + ' star');
      }
    });

    if (starFilters.length > 1) {
      starFilters = starFilters.join(', ');
    }

    return (
      <div>
        <h4>Currently filtering:</h4>
        <span style={{"fontWeight": "bold"}}>{starFilters}</span>
          <RemoveFiltersButton onClick={removeFilters}>Remove filter</RemoveFiltersButton>
      </div>
    );
  };

  const individualRatingAvg = (rating, sum = 0) => {
    sum = ratings[rating] * rating;
    return Math.round((ratings[rating] / totalRatings) * 100);
  };

  let recommendedPercentage = `${Math.round((recommended.true / totalRatings) * 100)}% of reviews recommend this product`;

  const renderRatingBreakdown = () => {

    let barColor = theme === 'light' ? "#36393E" : "#FFFAFA";
    return (
      [...Array(5)].map((rating, index) => {
        const starRating = 5 - index;
        const ratingPercent = {
          "width": `${individualRatingAvg(starRating)}%`,
          "height": "30px",
          "backgroundColor": barColor
        };
        return (
          <RatingsBreakdown key={index}>
              <RatingNumber
                value={starRating}
                onClick={handleRatingClick}>
                {starRating} star
              </RatingNumber>
              <RatingBarContainer>
                <div style={ratingPercent}></div>
              </RatingBarContainer>
              <RatingNumberTotal>{ratings[starRating]}</RatingNumberTotal>
            </RatingsBreakdown>
        );
      })
    );
  };

  return (
    <div>
      <AverageRating>
        {averageRating}
        <AverageRatingStars>{StarRating(averageRating)}</AverageRatingStars>
      </AverageRating>
      <div>
        <h3>Rating Breakdown</h3>
        {renderFilterMessage()}
        {renderRatingBreakdown()}
        <RecommendedMessage>{recommendedPercentage}</RecommendedMessage>
      </div>
    </div>
  );
}

export default RatingBreakdown;