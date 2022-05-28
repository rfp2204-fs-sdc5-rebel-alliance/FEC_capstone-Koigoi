import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';
import YourOutfitCarousel from './YourOutfitCarousel.jsx';

const outfitArray = [];

const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [outfitDetails, setOutfitDetails] = useState([]);
  const [outfitDetailsStorage, setOutfitDetailsStorage] = useState(JSON.parse(localStorage.getItem('outfit')) ? JSON.parse(localStorage.getItem('outfit')) : [])

  const getOutfitDetails = (id) => {
    const promiseArray = [];
    promiseArray.push(fetchData('styles', id));
    promiseArray.push(fetchData('', id));
    promiseArray.push(fetchRatingsData('meta', id));
    return Promise.all(promiseArray)
    .then(([productStyles, productInfo, productRatings]) => {
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
      let avgRating = sharedReviewsComponent(productRatings.ratings);
      let outfit = {
        id: id,
        image: defaultImage[0],
        category: productInfo.category,
        name: productInfo.name,
        price: productInfo.default_price,
        rating: avgRating.avgRating
      }
      setOutfitDetails([outfit]);
      outfitArray.push([outfit]);
    })
    .then(() => {
      console.log('outfitDetails', outfitDetails);
      console.log('outfitArray', outfitArray);
    })
    .catch((err) => console.log(err));
  }

  const getItemsFromStorage = () => {
    const storageIDs = {...localStorage};
    if (storageIDs === null) {
      Object.keys(storageIDs).forEach((id) => {
        getOutfitDetails(id);
      })
    }
  }

  useEffect(() => {
    getOutfitDetails(prod_id);
  }, []);

  const saveToStorage = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('saveToStorage', id);
    console.log('outfitDetails', outfitDetails);
    const localStorageItem = localStorage.getItem(id);
    if (localStorageItem === null) {
      localStorage.setItem(id, JSON.stringify(outfitDetails));
    } else {
      JSON.parse(localStorageItem).forEach((item) => {
        if (item.id === id) {
          console.log('item.id', item.id);
          console.log('id', id);
          return;
        } else {
          localStorage.setItem(id, JSON.stringify(outfitDetails));

          // let storageItems = JSON.parse(localStorageItem);
          // // push new data into storageItems
          // storageItems.unshift(outfitDetails);
          // localStorage.setItem(id, JSON.stringify(storageItems));
        }
      })
    }
  }


  return (
    <div>
      {/* {YourOutfitCarousel(outfitDetails)} */}
      <YourOutfitCarousel outfitDetails={outfitDetails} saveToStorage={saveToStorage}/>
    </div>
  )
}

export default YourOutfitDetails;