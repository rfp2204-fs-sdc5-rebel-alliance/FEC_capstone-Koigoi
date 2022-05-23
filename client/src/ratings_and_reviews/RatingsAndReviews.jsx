import React, { useState, useEffect, createContext, useContext } from 'react';
import styled from 'styled-components';

import ReviewList from './ReviewList.jsx';
import ReviewSort from './ReviewSort.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

export const ReviewsContext = createContext();

const RatingsAndReviewsContainer = styled.div`
  font-weight: normal;
  font-size: 14px;
`;

const RatingsAndReviewsLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LayoutLeft = styled.div`
  flex: 0 0 20rem;
  margin-right: 2rem;
`

const LayoutRight = styled.div`
  flex-grow: 2;
  margin-left: 2rem;
`

function RatingsAndReviews() {
  const [reviewCount, setReviewCount] = useState(2);
  const [sort, setSort] =  useState('relevance');
  const [toggleSort, setToggleSort] = useState(true);

  return (
    <ReviewsContext.Provider value={{ reviewCount, setReviewCount, sort, setSort, toggleSort, setToggleSort }}>
      <RatingsAndReviewsContainer>
        <h2>Ratings and Reviews</h2>
        <RatingsAndReviewsLayout>
          <LayoutLeft>
            <RatingBreakdown/>
          </LayoutLeft>
          <LayoutRight>
            <ReviewSort/>
            <br/>
            <ReviewList/>
          </LayoutRight>
        </RatingsAndReviewsLayout>
      </RatingsAndReviewsContainer>
    </ReviewsContext.Provider>
  );
}

export default RatingsAndReviews;