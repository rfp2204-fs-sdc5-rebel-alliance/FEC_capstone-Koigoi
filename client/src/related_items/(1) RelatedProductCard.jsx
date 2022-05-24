import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {ProdPageContext} from '../product_page.jsx';
// import getProductDetails from './ProductContext.jsx';
// import {RelatedDataContext} from './ProductContext.jsx';
import styled from 'styled-components';
import fetchData from './fetchData.jsx';


const RelatedProductCard = () => {
  // const {imageData, setImageData, productData, setProductData} = useContext(RelatedDataContext);
  const {prod_id} = useContext(ProdPageContext);
  const [related_ids, setRelated_ids] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [productData, setProductData] = useState([]);
  const promiseArray = [];

  const getProductDetails = () => {
    fetchData('related', prod_id)
      .then((relatedIDs) => {
        // console.log('relatedIDs: ', relatedIDs);
        setRelated_ids(relatedIDs);
        return relatedIDs
      })
      .then((relatedIDs) => {
        relatedIDs.forEach((id) => {
          promiseArray.push(fetchData('styles', id));
          promiseArray.push(fetchData('', id));
        })
        return Promise.all(promiseArray)
      })
      .then(([style1, product1, style2, product2,
              style3, product3, style4, product4]) => {
        let styles = [style1, style2, style3, style4];
        let products = [product1, product2, product3, product4];
        let previewImages = styles.map((style) => {
          return style.results;
        });
        setImageData(previewImages);
        setProductData(products);
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    console.log('Component Mounted');
    getProductDetails();
  }, [prod_id]);


  return (
      <IndividualCardStyle>
        <ImageStyle
          src={imageData}
          alt='Girl in black shoes'
        />
        {/* <CategoryStyle>{prod_category}</CategoryStyle> */}
        {/* <NameStyle>{prod_name}</NameStyle> */}
        {/* <PriceStyle>${prod_price}</PriceStyle> */}
      </IndividualCardStyle>

  )

}

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

export default RelatedProductCard;
