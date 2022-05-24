import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {ProdPageContext} from '../product_page.jsx';
import fetchData from './fetchData.jsx';
import styled from 'styled-components';
import RelatedProductCard from './ProductCard.jsx';

const RelatedProductDetail = () => {
  const {prod_id} = useContext(ProdPageContext);

  const [related_ids, setRelated_ids] = useState([]);
  const [prod_image, setProd_image] = useState([]);
  const [prod_category, setProd_category] = useState([]);
  const [prod_name, setProd_name] = useState([]);
  const [prod_price, setProd_price] = useState([]);

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
        // console.log('allRelatedStyles', allRelatedStyles);
        let styleDetails = allRelatedStyles.map((style) => {
          return style.results;
        });
        return styleDetails;
      })
      .then((styleDetails) => {
        // console.log('styleDetails', styleDetails);
        let previewImages = [];
        let previewImage = styleDetails.map((style) => {
          let isDefaultTrue = false;
          // console.log('style', style);
          style.forEach((id) => {
            // console.log('id', id);
            if (id['default?'] === true) {
              // console.log('id.photos', id.photos);
              isDefaultTrue = true;
              previewImages.push(id.photos[0].thumbnail_url);
            }
          })
          if (!isDefaultTrue) {
            previewImages.push(style[0].photos[0].thumbnail_url);
          }
        });
        // console.log('previewImages', previewImages);
        setProd_image(previewImages);
      })
      .catch((err) => {console.log(err)});
  }

  const getProductDetails = () => {
    // if (related_ids.length !== 0) {
    //   console.log('relatedID', related_ids);
    // }
    fetchData('related', prod_id)
      .then((relatedIDs) => {
        return relatedIDs;
      })
      .then((relatedIDs) => {
        let allRelatedProducts = relatedIDs.map((id) => {
          return fetchData('', id);
        })
        return Promise.all(allRelatedProducts);
      })
      .then((allRelatedProducts) => {
        // console.log('allRelatedProducts', allRelatedProducts);
        let productCategories = [];
        let productNames = [];
        let productPrices = [];
        allRelatedProducts.forEach((product) => {
          productCategories.push(product.category);
          productNames.push(product.name);
          productPrices.push(product.default_price);
        })
        setProd_category(productCategories);
        setProd_name(productNames);
        setProd_price(productPrices);
      })
      .catch((err) => {console.log(err)});
  }

  // const getProductRatings = () => {
  //   fetchData('related', prod_id)
  //     .then((relatedIDs) => {
  //       return relatedIDs;
  //     })
  //     .then((relatedIDs) => {
  //       let allRelatedProducts = relatedIDs.map((id) => {
  //         return fetchData('', id);
  //       })
  //       return Promise.all(allRelatedProducts);
  //     })
  // }

  useEffect(() => {
    console.log('Component Mounted');
    getProductPhoto();
    getProductDetails();
  }, [prod_id]);

  return (
    // <div>
    //   {prod_image.map((image) => {
    //     <RelatedProductCard

    //     />

    //   })}
    // </div>
      <IndividualCardStyle>
        <ImageStyle
          src={prod_image[3]}
          alt='product image'
        />
        <CategoryStyle>{prod_category[3]}</CategoryStyle>
        <NameStyle>{prod_name[3]}</NameStyle>
        <PriceStyle>${prod_price[3]}</PriceStyle>
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
