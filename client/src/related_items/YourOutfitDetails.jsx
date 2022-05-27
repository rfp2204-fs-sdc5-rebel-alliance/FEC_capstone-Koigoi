import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';
import styled from 'styled-components';

const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [outfitDetails, setOutfitDetails] = useState([]);

  const getOutfitDetails = () => {
    const promiseArray = [];
    promiseArray.push(fetchData('', prod_id));
    promiseArray.push(fetchRatingsData('meta', prod_id));
    return Promise.all(promiseArray)
    .then(([outfitInfo, outfitRatings]) => {
      // console.log('outfitInfo', outfitInfo);
      // console.log('outfitRatings', outfitRatings);
      let outfit = {
        category: outfitInfo.category,
        name: outfitInfo.name,
        price: outfitInfo.default_price,
        rating: sharedReviewsComponent(outfitRatings.ratings)
      }
      setOutfitDetails([outfit]);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getOutfitDetails();
  }, []);
}

export default YourOutfitDetails;