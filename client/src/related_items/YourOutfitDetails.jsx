import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';
import YourOutfitCarousel from './YourOutfitCarousel.jsx';


const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [outfitDetails, setOutfitDetails] = useState([]);

  const getOutfitDetails = () => {
    const promiseArray = [];
    promiseArray.push(fetchData('styles', prod_id));
    promiseArray.push(fetchData('', prod_id));
    promiseArray.push(fetchRatingsData('meta', prod_id));
    return Promise.all(promiseArray)
    .then(([productStyles, productInfo, productRatings]) => {
      // console.log('productStyles', productStyles);
      // console.log('productInfo', productInfo);
      // console.log('productRatings', productRatings);
      let defaultImage = [];
      let eachStyle = productStyles.results;
      let isDefaultTrue = false;
      eachStyle.forEach((style) => {
        if (style['default?']) {
          isDefaultTrue = true;
          defaultImage.push(style.photos[0].thumbnail_url);
        }
      });
      if (!isDefaultTrue) {
        defaultImage.push(eachStyle[0].photos[0].thumbnail_url);
      }
      let outfit = {
        image: defaultImage[0],
        category: productInfo.category,
        name: productInfo.name,
        price: productInfo.default_price,
        rating: sharedReviewsComponent(productRatings.ratings)
      }
      setOutfitDetails([outfit]);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getOutfitDetails();
  }, []);

  return (
    <div>
      {/* {YourOutfitCarousel(outfitDetails)} */}
      <YourOutfitCarousel outfitDetails={outfitDetails}/>
    </div>
  )
}

export default YourOutfitDetails;