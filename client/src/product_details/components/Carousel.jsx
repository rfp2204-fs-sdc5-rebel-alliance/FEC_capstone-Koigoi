import React, { useState } from 'react';


const Carousel = (slides) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  let nextSlide = () => {
    setCurrent(current === length - 1 ? 0: current + 1)
  };

  let prevSlide = () => {
    setCurrent(current === 0 ? length - 1: current - 1);
  };

  var CarouselStyles = {
    div: {
      display: 'flex',
      height: '35rem',
      width: 'auto'
    }
  }

  return (
    <section className="slider">
      <button onClick={prevSlide} >Previous</button>
      <button onClick={nextSlide} >Next</button>
      {slides.map((slide, index) => {
        return (
          <div key={index}>
            {index === current && (
              <img style={CarouselStyles.div} src={slide.url} alt="No Image" />
            )}
          </div>
        )
      })}
    </section>
  )
};

export default Carousel;