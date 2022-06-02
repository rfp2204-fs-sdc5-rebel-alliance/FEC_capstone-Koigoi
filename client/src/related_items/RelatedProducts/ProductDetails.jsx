import React, { useState, useEffect, useContext, createContext } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import { fetchRelatedData, fetchRatingsData } from '../Data/fetchRelatedData.js';
import RelatedCarousel from './CarouselList.jsx';
import { findDuplicates } from '../Data/findDuplicates.js';
import sharedReviewsComponent from '../../shared_components/sharedReviewsComponent';
import styled from 'styled-components';

export const RelatedCarouselContext = createContext();

const RelatedProductDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [productDetails, setProductDetails] = useState([]);
  const allRelatedDetails = [];

  const getAllRelatedDetails = () => {
    fetchRelatedData('related', prod_id)
    .then((relatedIDs) => {
        const promiseArray = [];
        relatedIDs.forEach((id) => {
          promiseArray.push(fetchRelatedData('styles', id));
          promiseArray.push(fetchRelatedData('', id));
          promiseArray.push(fetchRatingsData('meta', id));
        })
        return Promise.all(promiseArray)
      })
      .then((allRelatedProductsData) => {
        const styles = [];
        const products = [];
        const ratings = [];
        for (let i = 0; i < allRelatedProductsData.length; i+=3) {
          let data = allRelatedProductsData;
          styles.push(data[i]);
          products.push(data[i + 1]);
          ratings.push(data[i + 2]);
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
        let filteredProducts = findDuplicates(allRelatedDetails);
        setProductDetails(filteredProducts);
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    getAllRelatedDetails();
  }, [prod_id]);

  if (productDetails.length === 0) {
    return null;
  } else {
    return (
      <CarouselContainer>
        <RelatedCarouselContext.Provider value={{productDetails}}>
          <RelatedCarousel />
        </RelatedCarouselContext.Provider>
      </CarouselContainer>
    )
  }
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