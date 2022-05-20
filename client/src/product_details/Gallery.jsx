import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import config from '../../dist/config.js';

import Carousel from './components/Carousel.jsx';

//may need to import more stuff to begin work

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
      console.log(results);
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

  var styles = {
    div: {
      width: '60%',
      border: '0.5rem solid red',
      display: 'flex',
      justifyContent: 'center',
    },
    img: {
      display: 'flex',
      height: '35rem',
      width: 'auto'
    }
  }

  return (
    <>
      <div>
        <p onClick={getImages}>Item id: {prod_id}</p>
      </div>
      <div style={styles.div}>
        {Carousel(imageGallery)}
      </div>
    </>
  )

}

export default Gallery;