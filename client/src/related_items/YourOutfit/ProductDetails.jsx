import React, { useState, useContext } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import YourOutfitCarousel from './CarouselList.jsx';
import fetchOutfitDetails from '../Data/fetchOutfitData.js';
import EmptyCard from './EmptyCard.jsx';
import styled from 'styled-components';
import { ArrowTransparent } from '../Styled/Carousel.Styled.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const YourOutfitDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [windowLocalStorage, setWindowLocalStorage] = useState(JSON.parse(localStorage.getItem('outfits')) ? JSON.parse(localStorage.getItem('outfits')) : []);

  const saveToStorage = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    fetchOutfitDetails(id)
    .then((outfitData) => {
        let currentOutfits = windowLocalStorage.slice();
        let doesCurrentExist = currentOutfits.filter((item) => item.id === outfitData.id)
        if (!doesCurrentExist.length) {
          currentOutfits.push(outfitData);
        }
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
      <CarouselContainer className='CarouselContainer'>
        <ArrowTransparent icon={faAngleLeft}/>
          <EmptyCard saveToStorage={saveToStorage}/>
        <ArrowTransparent icon={faAngleRight} />
      </CarouselContainer>
    )
  } else {
    return (
      <CarouselContainer className='CarouselContainer'>
        <YourOutfitCarousel
          outfitDetails={windowLocalStorage}
          saveToStorage={saveToStorage}
          removeFromStorage={removeFromStorage}
        />
      </CarouselContainer>
    )
  }
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;

export default YourOutfitDetails;

