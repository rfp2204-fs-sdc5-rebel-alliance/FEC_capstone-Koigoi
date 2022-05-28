import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';
import YourOutfitCarousel from './YourOutfitCarousel.jsx';
import getOutfitDetails from './fetchYourOutfitData.js';
import styled from 'styled-components';

const outfitArray = [];

const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [windowLocalStorage, setWindowLocalStorage] = useState([]);
  // const [windowLocalStorage, setWindowLocalStorage] = useState(JSON.parse(localStorage.getItem('outfit')) ? JSON.parse(localStorage.getItem('outfit')) : [])

  const allStorageItems = {...localStorage};
  const storageArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const parsedStorageItems = JSON.parse(localStorage.getItem(key));
    console.log('parsedStorageItems', parsedStorageItems);
    storageArray.push(parsedStorageItems);
  }

  useEffect(() => {
    setWindowLocalStorage(([]) => [...storageArray]);
    // setWindowLocalStorage(storageArray);
  }, [localStorage]);


  const saveToStorage = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    getOutfitDetails(id)
    .then((outfitData) => {
      let storageOfCurrentOutfit = localStorage.getItem(id);
      if (storageOfCurrentOutfit === null) {
        localStorage.setItem(id, JSON.stringify(outfitData));
      } else {
        return;
      }
    })
    .catch((err) => console.log(err));
  }

  if (windowLocalStorage.length === 0) {
    return (
      <CarouselWrapper>
        <AddCard>
          <AddIcon
              src="https://icon-library.com/images/plus-symbol-icon/plus-symbol-icon-5.jpg"
              onClick={(e) => saveToStorage(e, prod_id)}
          />
          <AddOutfit> Add To Outfit </AddOutfit>
        </AddCard>
      </CarouselWrapper>
    )
  } else {
    return (
      <div>
        {/* {YourOutfitCarousel(outfitDetails)} */}
        <YourOutfitCarousel outfitDetails={windowLocalStorage} saveToStorage={saveToStorage}/>
      </div>
    )
  }
}

const CarouselWrapper = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  overflow: hidden;
  height: fit-content;
`;

const AddCard = styled.div`
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  border: 1px solid black;
  border-radius: 5px;
`;

const AddIcon = styled.img`
  position: relative;
  width: 215px;
  height: 230px;
`;

const AddOutfit = styled.div`
  text-align: center;
`;

export default YourOutfitDetails;