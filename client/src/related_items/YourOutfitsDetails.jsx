import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import styled from 'styled-components';

const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [outfitDetails, setOutfitDetails] = useState([]);
}

export default YourOutfitDetails;