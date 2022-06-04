import React, { useContext } from 'react';

import { ReviewsContext } from './RatingsAndReviews.jsx';

import styled from 'styled-components';

const ReviewSortContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 18px;
`;

const SortForm = styled.select`
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.fontColor};
  outline: 0;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;

const ReviewSort = () => {
  const { totalRatings, setSort } = useContext(ReviewsContext);

  return (
    <ReviewSortContainer>
      <br></br>
      <span>{totalRatings} reviews, sorted by </span>
      <form>
        <SortForm onChange={(event) => {setSort(event.target.value)}}>
          <option value={'relevant'}>relevant</option>
          <option value={'newest'}>newest</option>
          <option value={'helpful'}>helpful</option>
        </SortForm>
      </form>
    </ReviewSortContainer>
  );
}

export default ReviewSort;