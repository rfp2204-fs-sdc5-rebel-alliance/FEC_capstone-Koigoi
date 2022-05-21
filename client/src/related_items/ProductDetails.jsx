import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
// import {RelatedItemsContext} from './RelatedItems.jsx';
import {ProdPageContext} from '../product_page.jsx';
import fetchData from './fetchData.jsx';
import styled from 'styled-components';
// import Carousel from 'react-elastic-carousel';

const RelatedProductDetail = () => {
  const {prod_id} = useContext(ProdPageContext);

  const [related_ids, setRelated_ids] = useState([]);
  const [prod_image, setProd_image] = useState([]);
  const [prod_category, setProd_category] = useState([]);
  const [prod_name, setProd_name] = useState([]);
  const [prod_price, setProd_price] = useState([]);
  // const [prod_details, setProd_details] = useState([]);

  const promiseArray = [];

  const getProductPhoto = () => {
    fetchData('related', prod_id)
      .then((relatedIDs) => {
        // console.log('relatedIDs: ', relatedIDs);
        setRelated_ids(relatedIDs);
        return relatedIDs
      })
      .then((relatedIDs) => {
        let allRelatedStyles = relatedIDs.map((id) => {
          return fetchData('styles', id);
        });
        return Promise.all(allRelatedStyles);
      })
      .then((allRelatedStyles) => {
        // console.log(allRelatedStyles);
        let styleDetails = allRelatedStyles.map((style) => {
          return style.results;
        });
        setProd_image(styleDetails); // save data as array of arrays
        // let previewImage = styleDetails.map((style) => {
        //   style.forEach((id) => {
        //     let isTrue = false;
        //     if (id['default?'] === true) {
        //       isTrue = true;
        //       // console.log('id.photos', id.photos);
        //       setProd_image(id.photos[0].thumbnail_url); //
        //     }
        //   })
        // });
      })
      .catch((err) => {console.log(err)});
  }

  const getProductDetails = () => {
    // fetchData('related', prod_id)
      // .then((relatedData) => {return fetchData('', relatedData[1])})
      console.log('related_ids:', related_ids);
    if (related_ids) {
      // let allRelatedP  roducts = related_ids.map((id) => {
      //   console.log('id', id);
      //   return fetchData('', id);
      // })

      // Promise.all(related_ids.map((id) => {
      //   return fetchData('', id);
      // }))

      related_ids.forEach((id) => {
        promiseArray.push(fetchData('', id));
      })
      return Promise.all(promiseArray)
      .then((productData) => {
        console.log('productData:', productData);
        // setProd_category(productData.category);
        // setProd_name(productData.name);
        // setProd_price(productData.default_price);
      })
      .catch((err) => {console.log(err)});
    }
  }

  useEffect(() => {
    console.log('Component Mounted');
    getProductPhoto();
    // getProductDetails();
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



export default RelatedProductDetail;
