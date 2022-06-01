import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import styled from 'styled-components';
import Carousel from './RelatedCarouselList.jsx';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';

const RelatedProductDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [productDetails, setProductDetails] = useState([]);
  const allRelatedDetails = [];

  const getAllRelatedDetails = () => {
    fetchData('related', prod_id)
    .then((relatedIDs) => {
        const promiseArray = [];
        relatedIDs.forEach((id) => {
          promiseArray.push(fetchData('styles', id));
          promiseArray.push(fetchData('', id));
          promiseArray.push(fetchRatingsData('meta', id));
        })
        return Promise.all(promiseArray)
      })
      .then((allRelatedProductsData) => {
        const styles = [];
        const products = [];
        const ratings = [];
        for (let i = 0; i < allRelatedProductsData.length; i+=3) {
          let product = allRelatedProductsData;
          styles.push(product[i]);
          products.push(product[i+1]);
          ratings.push(product[i+2]);
        }
        /* parse through related styles */
        const allStyles = styles.map((style) => {return style.results;});
        const images = [];
        allStyles.map((eachStyle) => {
          let isDefaultTrue = false;
          eachStyle.forEach((style) => {
            if (style['default?']) {
              isDefaultTrue = true;
              images.push(style.photos[0].thumbnail_url);
            }
          });
          if (!isDefaultTrue) {
            images.push(eachStyle[0].photos[0].thumbnail_url);
          }
        });
        /* parse through related product details */
        const productID = [];
        const productCategories = [];
        const productNames = [];
        const productPrices = [];
        products.forEach((product) => {
          productID.push(product.id);
          productCategories.push(product.category);
          productNames.push(product.name);
          productPrices.push(product.default_price);
        });
        /* parse through related ratings */
        const productRatings = [];
        ratings.forEach((rating) => {
          productRatings.push(sharedReviewsComponent(rating.ratings))
        })
        /* combine all data into one state */
        for (let i = 0; i < images.length; i++) {
          const allRelatedProducts = {};
          allRelatedProducts.images = images[i];
          allRelatedProducts.id = productID[i];
          allRelatedProducts.categories = productCategories[i];
          allRelatedProducts.names = productNames[i];
          allRelatedProducts.prices = productPrices[i];
          allRelatedProducts.ratings = productRatings[i];
          allRelatedDetails.push(allRelatedProducts);
        }
        setProductDetails(allRelatedDetails);
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    getAllRelatedDetails();
  }, [prod_id]);

  return (
      <CarouselContainer>
        {Carousel(productDetails)}
      </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;


export default RelatedProductDetails;
