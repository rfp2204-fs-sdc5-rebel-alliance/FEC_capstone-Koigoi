import React from 'react';
import styled from 'styled-components';

const StarRating = (avgRating) => {
  const starsTotal = 5;
  const starPercentage = `${Math.floor((avgRating / starsTotal) * 100)}%`;
  const width = {width: starPercentage};
  // const starPercentage = (avgRating / starsTotal) * 100;
  // const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return (
    <div>
        <div className='stars-outer'>
          <div className='stars-inner' style={width}> </div>
        </div>
    </div>
  )
}

export default StarRating;