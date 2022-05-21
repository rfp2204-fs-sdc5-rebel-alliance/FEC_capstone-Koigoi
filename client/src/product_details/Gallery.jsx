import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';
import config from '../../dist/myConfig.js';

import Carousel from './components/Carousel.jsx';
import ImageList from './components/ImageList.jsx';

//may need to import more stuff to begin work

const Container = styled.div`
  width: 60%;
  border: 0.5rem solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gallery = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [imageGallery, setGallery] = useState([]);

  let getImages = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prod_id}/styles`, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((results) => {
      // console.log(results);
      results.data.results.forEach((style) => {
        if (style['default?'] === true) {
          setGallery(style.photos);
        }
      })
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getImages();
  }, [prod_id]);

  return (
    <Container>
      {ImageList(imageGallery)}
      {Carousel(imageGallery)}
    </Container>
  )

}

export default Gallery;