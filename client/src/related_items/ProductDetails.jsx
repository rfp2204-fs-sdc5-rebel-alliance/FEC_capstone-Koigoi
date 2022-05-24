import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {ProdPageContext} from '../product_page.jsx';
import fetchData from './fetchData.jsx';
import styled from 'styled-components';
import RelatedProductCard from './ProductCard.jsx';

const RelatedProductDetail = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [prod_details, setProd_details] = useState([]);
  const allProductList = [];

  // const [prod_image, setProd_image] = useState([]);
  // const [prod_category, setProd_category] = useState([]);
  // const [prod_name, setProd_name] = useState([]);
  // const [prod_price, setProd_price] = useState([]);

  const promiseArray = [];

  const getAllRelatedDetails= () => {
    fetchData('related', prod_id)
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
        /* parse through related styles */
        let allStyles = styles.map((style) => {
          return style.results;
        });
        let images = [];
        let previewImages = allStyles.map((image) => {
          let isDefaultTrue = false;
          image.forEach((id) => {
            if (id['default?'] === true) {
              isDefaultTrue = true;
              images.push(id.photos[0].thumbnail_url);
            }
          })
          if (!isDefaultTrue) {
            images.push((image[0].photos[0].thumbnail_url));
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
          allProductList.push(allRelatedProducts);
        }
        console.log('allProductList', allProductList);
        setProd_details(allProductList);
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    console.log('Component Mounted');
    getAllRelatedDetails();
  }, [prod_id]);

  return (
      <div>
        {
          prod_details.map((details, index) => (
            <RelatedProductCard details={details} key={index}/>
          ))
        }
      </div>
  )
}

export default RelatedProductDetail;
