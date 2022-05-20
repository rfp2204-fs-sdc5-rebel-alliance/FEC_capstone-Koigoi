import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
// import {RelatedItemsContext} from './RelatedItems.jsx';
import {ProdPageContext} from '../product_page.jsx';
import config from '../../dist/config.js';
import fetchData from './fetchData.jsx';
import styled from 'styled-components';
// import Carousel from 'react-elastic-carousel';

const IndividualCardStyle = styled.div`
  display: tabel-cell, relative;
  position: relative;
  border: 1px solid black;
  mid-width: 250px;
  height: fit-content;
  margin-right: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  object-fit: cover;
`;

const ImageStyle = styled.img`
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 250px;
`;

const CategoryStyle = styled.div`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 15px;
  padding-left: 5px;
`;

const NameStyle = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding-left: 5px;
`;

const PriceStyle = styled.span`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

const RelatedProductDetail = () => {

  const {prod_id} = useContext(ProdPageContext);

  const [prod_image, setProd_image] = useState('');
  const [prod_category, setProd_category] = useState('');
  const [prod_name, setProd_name] = useState('');
  const [prod_price, setProd_price] = useState('');
  // const [prod_details, setProd_details] = useState([]);
  // const [related_ids, setRelated_ids] = useState([]);

  useEffect(() => {
    console.log('Component Mounted');
    fetchData('related', prod_id)
      .then((relatedData) => {return fetchData('styles', relatedData[1])}) // need to loop through all relatedData, not just one
      .then((productData) => {
        for (let i = 0; i < productData.results.length; i++) {
          let current = productData.results[i];
          if (current['default?'] === true) {
            setProd_image(current.photos[0].thumbnail_url); // grab the first url
          }
        }
      })
      .catch((err) => {console.log(err)});
  }, [prod_id]);

  useEffect(() => {
    fetchData('related', prod_id)
      .then((relatedData) => {return fetchData('', relatedData[1])})
      .then((productData) => {
        setProd_category(productData.category);
        setProd_name(productData.name);
        setProd_price(productData.default_price);
      })
      .catch((err) => {console.log(err)});
  }, [prod_id]);

  return (
      <IndividualCardStyle>
        <ImageStyle
          src={prod_image}
          alt='Girl in black shoes'
        />
        <CategoryStyle>{prod_category}</CategoryStyle>
        <NameStyle>{prod_name}</NameStyle>
        <PriceStyle>${prod_price}</PriceStyle>
      </IndividualCardStyle>
  )
}



export default RelatedProductDetail;
