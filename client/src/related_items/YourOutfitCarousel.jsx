import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../shared_components/StarRating.jsx';
import { ProdPageContext } from '../product_page.jsx';

const YourOutfitCarousel = ({outfitDetails}) => {
  console.log('outfitDetails', outfitDetails);
  const {prod_id} = useContext(ProdPageContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = outfitDetails.slice(currentImageIdx, (currentImageIdx + 4)); // change to 4
  const maxDisplay = outfitDetails.length - 4; // change to 4
  const placeholder = 'http://placecorgi.com/260/180';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  useEffect(() => {
    setCurrentImageIdx(0);
  }, [outfitDetails]);

  const saveToStorage = (e, id) => {
    console.log(id);
  }

  const removeFromStorage = (e, id) => {
    console.log(id);
  }

  return (
    <div>
      <CarouselContainer>
        {currentImageIdx !== 0 ?
        <LeftArrow><FontAwesomeIcon icon={faAngleLeft} onClick={() => prevSlide()}/></LeftArrow>
        : null}
        <CarouselWrapper>
          <AddCard>
            <AddIcon
               src="https://icon-library.com/images/plus-symbol-icon/plus-symbol-icon-5.jpg"
               onClick={(e) => saveToStorage(e, prod_id)}
            />
            <AddOutfit> Add To Outfit </AddOutfit>
          </AddCard>
          <AddedOutfit>
            {display.map((details, index) => {
              return (
                <IndividualCardStyle key={index}>
                  <ButtonStyle onClick={(e) => removeFromStorage(e, prod_id)}>
                    x
                  </ButtonStyle>
                  <ImageStyle
                    src={details.image === null ? placeholder : details.image}
                  />
                  <CategoryStyle>{details.category}</CategoryStyle>
                  <NameStyle>{details.name}</NameStyle>
                  <PriceStyle>${details.price}</PriceStyle>
                  <RatingsStyle>{StarRating(details.rating.avgRating)}</RatingsStyle>
                </IndividualCardStyle>
              )
            })}
          </AddedOutfit>
        </CarouselWrapper>
        {currentImageIdx === maxDisplay ? null :
        <RightArrow><FontAwesomeIcon icon={faAngleRight} onClick={() => nextSlide()}/></RightArrow>}
      </CarouselContainer>
    </div>
  )
}

const CarouselContainer = styled.div`
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  position: relative;
  max-width: 1000px;
  left: 50%;
  transform: translateX(-50%);
  height: fit-content;
`;

const CarouselWrapper = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  overflow: hidden;
  height: fit-content;
`;

const LeftArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 32px;
`;

const RightArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 32px;
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

const AddedOutfit = styled.div`
  display: flex;
  position: relative;
  margin-left: 30px;
  flex-direction: row;
  width: 250px;
  height: max-content;
`;

const IndividualCardStyle = styled.div`
  position: relative;
  border: 1px solid black;
  // min-width: 250px;
  width: 250px;
  height: fit-content;
  margin-right: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  object-fit: cover;
`;

const ButtonStyle = styled.button`
  position: relative;
  background-color: transparent;
`;

const ImageStyle = styled.img`
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 250px;
  position: relative;
`;

const CategoryStyle = styled.div`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 15px;
  padding-left: 5px;
`;

const NameStyle = styled.div`
  font-weight: bold;
  font-size: 17px;
  padding-left: 5px;
`;

const PriceStyle = styled.div`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

const RatingsStyle = styled.div`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

export default YourOutfitCarousel;