import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { ReviewsContext } from './RatingsAndReviews.jsx';

const ProductBreakdownHeader = styled.h3`
  margin-bottom: 10px;
`;

const CharacteristicBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: white;
`;

const CharacteristicName = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CharacteristicLabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 30px;
  margin: 0px 5px;
`;

function ProductBreakdown () {
    const { characteristics, setShowCharacteristics } = useContext(ReviewsContext);

    const characteristicsLayout = [];

    const characteristicLabels = {
      Size: ['A size too small', 'A size too wide'],
      Width: ['Too narrow', 'Too wide'],
      Comfort: ['Uncomfortable', 'Perfect'],
      Quality: ['Poor', 'Perfect'],
      Length: ['Runs Short', 'Runs long'],
      Fit: ['Runs tight', 'Runs long']
    }

    const renderCharacteristics = () => {

      Object.keys(characteristics).forEach((characteristic) => {

        const characteristicValue = {
          'display': 'flex',
          'alignItems': 'center',
          'position': 'relative',
          'left': `${Math.round(characteristics[characteristic].value) * 25}%`,
          'height': '30px',
        }

        characteristicsLayout.push(
          <div>
            <CharacteristicName>{characteristic}</CharacteristicName>
            <CharacteristicBarContainer>
              <div style={characteristicValue}><FontAwesomeIcon icon={faCaretDown} size='2x'/></div>
            </CharacteristicBarContainer>
            <CharacteristicLabelsContainer>
              <div>{characteristicLabels[characteristic][0]}</div>
              <div>{characteristicLabels[characteristic][1]}</div>
            </CharacteristicLabelsContainer>
          </div>
        )
      })
    }

    renderCharacteristics();

    return (
      <div>
        <div>
          <ProductBreakdownHeader>Product Breakdown</ProductBreakdownHeader>
        </div>
        {characteristicsLayout.map((element, index) =>
        <div key={index}>{element}</div>
      )}
      </div>
    );
}

export default ProductBreakdown;