import React, { useState, useContext, useEffect } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData } from './fetchData.js';
import axios from 'axios';
import styled from 'styled-components';

const ComparisonModal = ({ mainId, relatedId }) => {
  const [features, setFeatures] = useState([]);
  const [mainFeatures, setMainFeatures] = useState([]);
  const [relatedFeatures, setRelatedFeatures] = useState([]);
  // console.log('mainID', mainId);
  // console.log('relatedID', relatedId);

  const getAllFeatures = () => {
    const promiseArray = [];
    promiseArray.push(fetchData('', mainId));
    promiseArray.push(fetchData('', relatedId));
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
    .catch((err) => {console.log(err)});
  }


  useEffect(() => {
    getAllFeatures();
  }, []);

  const isMainFeaturesIncluded = (value) => {
    let isTrue;
    for (let i = 0; i < mainFeatures.length; i++) {
      const currentValue = mainFeatures[i].value
      if (currentValue.includes(value)) {
        isTrue = true;
        break;
      } else {
        isTrue = false;
      }
    }
    return isTrue;
  }

  const isRelatedFeaturesIncluded = (value) => {
    let isTrue;
    for (let i = 0; i < relatedFeatures.length; i++) {
      const currentValue = relatedFeatures[i].value
      if (currentValue.includes(value)) {
        isTrue = true;
        break;
      } else {
        isTrue = false;
      }
    }
    return isTrue;
  }

  if (features.length === 0 ||
      mainFeatures.length === 0 ||
      relatedFeatures.length === 0
      ) {
    return null;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <LeftHeader>{features[0].name}</LeftHeader>
            <th> </th>
            <RightHeader>{features[features.length-1].name}</RightHeader>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index}>
              <LeftValues>{isMainFeaturesIncluded(feature.value) ? '✓' : ''}</LeftValues>
              <MiddleValues>{feature.value}</MiddleValues>
              <RightValues>{isRelatedFeaturesIncluded(feature.value) ? '✓' : ''}</RightValues>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const LeftValues = styled.td`
  position: flex;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: bold;
`;

const RightValues = styled.td`
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

const LeftHeader = styled.th`
  padding-left: 15px;
  padding-right: 10px;
`;

const RightHeader = styled.th`
  padding-left: 10px;
  padding-right: 10px;
`;


export default ComparisonModal;