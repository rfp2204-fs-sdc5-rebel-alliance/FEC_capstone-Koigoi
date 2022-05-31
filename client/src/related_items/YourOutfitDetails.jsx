import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import { fetchData, fetchRatingsData } from './fetchData.js';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';
import YourOutfitCarousel from './YourOutfitCarousel.jsx';
import getOutfitDetails from './fetchYourOutfitData.js';
import styled from 'styled-components';

const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [windowLocalStorage, setWindowLocalStorage] = useState(JSON.parse(localStorage.getItem('outfits')) ? JSON.parse(localStorage.getItem('outfits')) : []);

  const saveToStorage = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    getOutfitDetails(id)
    .then((outfitData) => {
      /* make copy of the existing state and check if the data exists in the copy */
        let currentOutfits = windowLocalStorage.slice();
        let doesCurrentExist = currentOutfits.filter((item) => item.id === outfitData.id)
        if (!doesCurrentExist.length) {
          currentOutfits.push(outfitData);
        }
        /* set state and localStorage to copyArray with the new outfit added */
        localStorage.setItem('outfits', JSON.stringify(currentOutfits));
        setWindowLocalStorage(currentOutfits);
    })
    .catch((err) => console.log(err));
  }

  const removeFromStorage = (e, id) => {
    let currentOutfits = windowLocalStorage.slice();
    currentOutfits.forEach((outfit, index) => {
      if (outfit.id === id) {
        currentOutfits.splice(index, 1);
      }
    });
    localStorage.setItem('outfits', JSON.stringify(currentOutfits));
    setWindowLocalStorage(currentOutfits);
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
        <YourOutfitCarousel
          outfitDetails={windowLocalStorage}
          saveToStorage={saveToStorage}
          removeFromStorage={removeFromStorage}
        />
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


// const allStorageItems = {...localStorage};
//   const storageArray = [];
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const parsedStorageItems = JSON.parse(localStorage.getItem(key));
//     // console.log('parsedStorageItems', parsedStorageItems);
//     storageArray.push(parsedStorageItems);
//   }

// useEffect(() => {
  //   setWindowLocalStorage(([]) => [...storageArray]); // this would change the state
  // }, [allStorageItems]); // infinite loop -> need to somehow track when the localStorage changes.





   // const storageHasUpdated = React.useRef(false);

  // if (storageHasUpdated.current) {
  //   useEffect(() => {
  //       setWindowLocalStorage(([]) => [...storageArray]);
  //   }, [allStorageItems]); // infinite loop -> need to somehow track when the localStorage changes.
  // } else {
  //   useEffect(() => {
  //     setWindowLocalStorage(([]) => [...storageArray]);
  //   }, []);
  // }


   // useEffect(() => {
  //   setWindowLocalStorage(([]) => [
  //     {
  //       id: 'testing',
  //       image: 'testing',
  //       category: 'testing',
  //       name: 'testing',
  //       price: 'testing',
  //       rating: 3.5
  //     }
  //   ]);
  // }, windowLocalStorage);