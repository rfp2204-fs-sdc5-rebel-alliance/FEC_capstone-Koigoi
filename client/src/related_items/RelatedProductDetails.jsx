import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {ProdPageContext} from '../product_page.jsx';
import {fetchData, fetchRatingsData} from './fetchData.jsx';
import styled from 'styled-components';
import Carousel from './RelatedCarouselList.jsx';

const RelatedProductDetail = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [prod_details, setProd_details] = useState([]);
  const allRelatedDetails = [];

  const getAllRelatedDetails= () => {
    fetchData('related', prod_id)
    .then((relatedIDs) => {
        const promiseArray = [];
        relatedIDs.forEach((id) => {
          promiseArray.push(fetchData('styles', id));
          promiseArray.push(fetchData('', id));
          // promiseArray.push(fetchRatingsData('meta', id));
        })
        return Promise.all(promiseArray)
      })
      // .then((results) => {
      //   console.log(results);
      .then(([style1, product1, style2, product2,
              style3, product3, style4, product4]) => {
        let styles = [style1, style2, style3, style4];
        let products = [product1, product2, product3, product4];
        /* parse through related styles */
        let allStyles = styles.map((style) => {
          return style.results;
        });
        let images = [];
        allStyles.map((defaultImages) => {
          let isDefaultTrue = false;
          defaultImages.forEach((image) => {
            if (image['default?'] === true) {
              isDefaultTrue = true;
              images.push(image.photos[0].thumbnail_url);
            }
          })
          if (!isDefaultTrue) {
            images.push((defaultImages[0].photos[0].thumbnail_url));
          }
        });
        /* parse through related product details */
        let productCategories = [];
        let productNames = [];
        let productPrices = [];
        products.forEach((product) => {
          productCategories.push(product.category);
          productNames.push(product.name);
          productPrices.push(product.default_price);
        })
        /* combine all data into one state */
        for (let i = 0; i < images.length; i++) {
          let allRelatedProducts = {};
          allRelatedProducts.images = images[i];
          allRelatedProducts.categories = productCategories[i];
          allRelatedProducts.names = productNames[i];
          allRelatedProducts.prices = productPrices[i];
          allRelatedDetails.push(allRelatedProducts);
        }
        setProd_details(allRelatedDetails);
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    getAllRelatedDetails();
  }, [prod_id]);

  return (
      <div>
        {Carousel(prod_details)}
      </div>
  )
}

export default RelatedProductDetail;
