import React, { useContext, useEffect } from 'react';
import { ReviewsContext } from './RatingsAndReviews.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const ProductBreakdownHeader = styled.h3`
  margin-bottom: 10px;
`;

const CharacteristicBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid ${(props) => props.theme.fontColor};
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

const ProductBreakdown = () => {
    const { characteristics, characteristicLabels, setCharacteristicLabels, showCharacteristicLabel,
      setShowCharacteristicLabel } = useContext(ReviewsContext);

    useEffect(() => {
      setCharacteristicLabels({
        Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big',  'A size too wide'],
        Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
        Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
        Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
        Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
        Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
      });
      setShowCharacteristicLabel({
        Size: [false, false, false, false, false],
        Width: [false, false, false, false, false],
        Comfort: [false, false, false, false, false],
        Quality: [false, false, false, false, false],
        Length: [false, false, false, false, false],
        Fit: [false, false, false, false, false]
      })
    }, []);

    const characteristicsLayout = [];

    const renderCharacteristics = () => {

      Object.keys(characteristics).forEach((characteristic) => {
        let averageCharacteristicValue = (Math.round(characteristics[characteristic].value));

        if (averageCharacteristicValue === 1) {
          averageCharacteristicValue = 0;
        } else if (averageCharacteristicValue === 2) {
          averageCharacteristicValue = 23;
        } else if (averageCharacteristicValue === 3) {
          averageCharacteristicValue = 47;
        } else if (averageCharacteristicValue === 4) {
          averageCharacteristicValue = 70;
        } else {
          averageCharacteristicValue = 94;
        }

        const characteristicValue = {
          "display": "flex",
          "alignItems": "center",
          "position": "relative",
          "left": `${averageCharacteristicValue}%`,
          "height": "30px",
        };

        characteristicsLayout.push(
          <div>
            <CharacteristicName>{characteristic}</CharacteristicName>
            <CharacteristicBarContainer>
              <div style={characteristicValue}>
                <FontAwesomeIcon icon={faCaretDown} size="2x"/>
              </div>
            </CharacteristicBarContainer>
            <CharacteristicLabelsContainer>
              <div>{characteristicLabels[characteristic][0]}</div>
              <div>{characteristicLabels[characteristic][4]}</div>
            </CharacteristicLabelsContainer>
          </div>
        );
      });
    };

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