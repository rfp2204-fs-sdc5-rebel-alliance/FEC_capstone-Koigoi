import React, { useState, useContext } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CarouselStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  border: 0.5rem solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 40rem;
`;

const ImgStyle = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: auto;
`;

const Carousel = (slides) => {
  const [current, setCurrent] = useState(0);
  const {index, setIndex} = useContext(ProdDetailsContext);

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  let nextSlide = () => {
    setIndex(index === slides.length - 1 ? 0: index + 1)
  };

  let prevSlide = () => {
    setIndex(index === 0 ? slides.length - 1: index - 1);
  };

  // if (!Array.isArray(slides) || slides.length === 0) {
  //   return null;
  // }

  // let nextSlide = () => {
  //   setCurrent(current === slides.length - 1 ? 0: current + 1)
  // };

  // let prevSlide = () => {
  //   setCurrent(current === 0 ? slides.length - 1: current - 1);
  // };

  return (
    <CarouselStyle>
      <FontAwesomeIcon icon={faAngleLeft} onClick={prevSlide}/>
      <ImgContainer>
        {slides.map((slide, number) => {
          return (
            <div key={number}>
              {number === index && (
                <ImgStyle src={slide.url} alt="No Image" />
              )}
            </div>
          )
        })}
      </ImgContainer>
      <FontAwesomeIcon icon={faAngleRight} onClick={nextSlide}/>
    </CarouselStyle>
  )
};

export default Carousel;

//<button onClick={nextSlide} >Next</button>