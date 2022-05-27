import React, { useState, useContext, useEffect } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData } from './fetchData.js';
import axios from 'axios';
import styled from 'styled-components';

const ComparisonModal = ({ mainId, relatedId }) => {
  const [features, setFeatures] = useState([]);
  const mainFeatures = [];
  const relatedFeatures = [];
  // console.log('mainID', mainId);
  // console.log('relatedID', relatedId);

  const getAllFeatures = () => {
    const promiseArray = [];
    promiseArray.push(fetchData('', mainId));
    promiseArray.push(fetchData('', relatedId));
    return Promise.all(promiseArray)
    .then(([main, related]) => {
      // console.log(main);
      // console.log(related);
      main.features.forEach((feature) => {
        if (feature.value !== null) {
          mainFeatures.push({
            name: main.name,
            value: feature.value
          });
        }
      });
      related.features.forEach((feature) => {
        if (feature.value !== null) {
          relatedFeatures.push({
            name: related.name,
            value: feature.value
          });
        }
      });
      setFeatures(mainFeatures.concat(relatedFeatures));
    })
    .catch((err) => {console.log(err)});
  }

  // const isMainFeatures = (feature) => {
  //   if (mainFeatures.indexOf(feature) !== -1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // const isRelatedFeatures = (feature) => {
  //   if (relatedFeatures.indexOf(feature) !== -1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  useEffect(() => {
    getAllFeatures();
  }, []);

  console.log('allfeatures', features);

  if (features.length === 0) {
    return null;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>{features[0].name}</th>
            <th> </th>
            <th>{features[features.length-1].name}</th>
          </tr>
        </thead>
      </table>
    )
  }
}


export default ComparisonModal;