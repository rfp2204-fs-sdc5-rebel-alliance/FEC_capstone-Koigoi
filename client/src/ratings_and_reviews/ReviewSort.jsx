import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { ReviewsContext } from './RatingsAndReviews.jsx';

const ReviewSortContainer = styled.div`
  font-weight: bold;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid black;
`;

function ReviewSort() {
  const { ratingsTotal, sort, setSort, setToggleSort } = useContext(ReviewsContext);

  const handleClick = (event) => {
    setToggleSort(true);
    setSort(event.target.value);
  }

  return (
    <ReviewSortContainer>
      <br></br>
      <span>{ratingsTotal} reviews, sorted by </span>
      <SortButton>{sort} <FontAwesomeIcon icon={faChevronDown}/></SortButton>
      <button value={'helpful'} onClick={handleClick}>helpful</button>
      <button value={'newest'} onClick={handleClick}>newest</button>
      <button value={'relevant'} onClick={handleClick}>relevant</button>
    </ReviewSortContainer>
  )
}

export default ReviewSort;