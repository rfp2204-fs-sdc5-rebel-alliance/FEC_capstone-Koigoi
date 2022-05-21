import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { ReviewsContext } from './RatingsAndReviews.jsx';

const ReviewSortContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 18px;
`;

const SortForm = styled.select`
  background-color: aquamarine;
  border: none;
  border-bottom: 2px solid black;
  outline: 0;
`;

function ReviewSort() {
  const { ratingsTotal, sort, setSort, setToggleSort } = useContext(ReviewsContext);

  const handleChange = (event) => {
    setToggleSort(true);
    setSort(event.target.value);
  }

  return (
    <ReviewSortContainer>
      <br></br>
      <span>{ratingsTotal} reviews, sorted by </span>
      <form>
        <SortForm onChange={handleChange}>
          <option value={'relevant'}>relevant</option>
          <option value={'newest'}>newest</option>
          <option value={'helpful'}>helpful</option>
        </SortForm>
      </form>
    </ReviewSortContainer>
  )
}

export default ReviewSort;