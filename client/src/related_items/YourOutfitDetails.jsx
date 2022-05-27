import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import styled from 'styled-components';

const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [outfitDetails, setOutfitDetails] = useState([]);

  const getOutfitDetails = () => {
    const promiseArray = [];
    promiseArray.push(fetchData('', prod_id));
    promiseArray.push(fetchRatingsData('meta', prod_id));
    return Promise.all(promiseArray)
    .then(([outfitDetails, outfitRatings]) => {
      console.log('outfitDetails', outfitDetails);
      console.log('outfitRatings', outfitRatings);
    })
  }

  useEffect(() => {
    getOutfitDetails();
  }, []);
}

export default YourOutfitDetails;