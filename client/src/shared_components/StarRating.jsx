import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

const StarRating = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faStar} />
    </div>

  )
}

export default StarRating;