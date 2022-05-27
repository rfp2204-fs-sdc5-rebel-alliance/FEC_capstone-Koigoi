import React, { useState, useContext } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

//this is a carousel component

const CarouselStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 40rem;
`;

const ImgStyle = styled.img`
  display: block;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: auto;
  pointer-events: none
`;

const ArrowStyle = styled.div`
  &:hover,
  &:focus {
    transform: scale(1.25);
  }
`;

const TestStyle = styled.div`
  background-repeat: no-repeat;
  &:hover img {
    opacity: 0;
  }
`;

const ExpandedCarousel = (slides) => {
  const [current, setCurrent] = useState(0);
  const {index, setIndex} = useContext(ProdDetailsContext);
  const [zoomPosition, setZoomPosition] = useState('0% 0%');

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  let nextSlide = () => {
    if (index === slides.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  let prevSlide = () => {
    if (index === 0) {
      setIndex(slides.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  let handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    let x = (event.pageX - left) / width * 100;
    let y = (event.pageY - top) / height * 100;
    setZoomPosition(`${x}% ${y}%`);
  }

  return (
    <CarouselStyle>
      <ArrowStyle>
        <FontAwesomeIcon icon={faAngleLeft} onClick={prevSlide}/>
      </ArrowStyle>
      <ImgContainer>
        {slides.map((slide, number) => {
          return (
            <TestStyle key={number} onMouseMove={handleMouseMove} style={{backgroundImage: `url(${slide.url})`, backgroundPosition: zoomPosition}}>
              {number === index && (
                <ImgStyle src={slide.url} alt="No Image" />
              )}
            </TestStyle>
          )
        })}
      </ImgContainer>
      <ArrowStyle>
        <FontAwesomeIcon icon={faAngleRight} onClick={nextSlide}/>
      </ArrowStyle>
    </CarouselStyle>
  )
};

export default ExpandedCarousel;