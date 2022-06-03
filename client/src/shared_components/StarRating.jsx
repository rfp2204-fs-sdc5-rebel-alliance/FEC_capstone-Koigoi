import React from 'react';
import styled from 'styled-components';

const OuterStarColor = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.body};
`;

const InnerStarColor = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.fontColor};
`;

const StarRating = (avgRating) => {
  const starsTotal = 5;
  const starPercentage = `${Math.floor((avgRating / starsTotal) * 100)}%`;
  const width = {width: starPercentage};
  // const starPercentage = (avgRating / starsTotal) * 100;
  // const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return (
    <div>
        <OuterStarColor className='stars-outer'>
          <InnerStarColor className='stars-inner' style={width}> </InnerStarColor>
        </OuterStarColor>
    </div>
  )
}

export default StarRating;