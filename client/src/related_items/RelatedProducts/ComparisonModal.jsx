import React, { useState, useEffect } from 'react';
import { fetchRelatedData } from '../Data/fetchRelatedData.js';
import styled from 'styled-components';

const ComparisonModal = ({ mainId, relatedId }) => {
  const [features, setFeatures] = useState([]);
  const [mainFeatures, setMainFeatures] = useState([]);
  const [relatedFeatures, setRelatedFeatures] = useState([]);

  const getAllFeatures = () => {
    const promiseArray = [];
    promiseArray.push(fetchRelatedData('', mainId));
    promiseArray.push(fetchRelatedData('', relatedId));
    return Promise.all(promiseArray)
      .then(([main, related]) => {
        const mainProduct = [];
        const relatedProduct = [];
        main.features.forEach((feature) => {
          if (feature.value !== null) {
            mainProduct.push({
              name: main.name,
              value: feature.value
            });
          }
        });
        related.features.forEach((feature) => {
          if (feature.value !== null) {
            relatedProduct.push({
              name: related.name,
              value: feature.value
            });
          }
        });
        setMainFeatures(mainProduct);
        setRelatedFeatures(relatedProduct);
        setFeatures(mainProduct.concat(relatedProduct));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllFeatures();
  }, []);

  const isMainFeaturesIncluded = (value) => {
    let isTrue;
    for (let i = 0; i < mainFeatures.length; i++) {
      const currentValue = mainFeatures[i].value;
      if (currentValue.includes(value)) {
        isTrue = true;
        break;
      }
      isTrue = false;
    };
    return isTrue;
  }

  const isRelatedFeaturesIncluded = (value) => {
    let isTrue;
    for (let i = 0; i < relatedFeatures.length; i++) {
      const currentValue = relatedFeatures[i].value;
      if (currentValue.includes(value)) {
        isTrue = true;
        break;
      }
      isTrue = false;
    };
    return isTrue;
  }

  if (
    features.length === 0
    || mainFeatures.length === 0
    || relatedFeatures.length === 0
  ) {
    return null;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <HeaderStyle> {features[0].name} </HeaderStyle>
            <th> </th>
            <HeaderStyle> {features[features.length-1].name} </HeaderStyle>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={ index }>
              <Values> {isMainFeaturesIncluded(feature.value) ? '✓' : ''} </Values>
              <MiddleValues> {feature.value} </MiddleValues>
              <Values> {isRelatedFeaturesIncluded(feature.value) ? '✓' : ''} </Values>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
};

const Values = styled.td`
  position: flex;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: bold;
`;

const MiddleValues = styled.td`
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const HeaderStyle = styled.th`
  padding-left: 10px;
  padding-right: 10px;
`;

export default ComparisonModal;