import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';

import config from '../../dist/config.js';


//may need to import more stuff to begin work

const Gallery = () => {
  const {prod_id} = useContext(ProdPageContext);
  let mainImage = '';

  let getImage = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prod_id}/styles`, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((results) => {console.log(results)})
    .catch((err) => console.log(err));
  }


  return (
    <div>
      <p onClick={getImage}>This is an image gallery test! Item id: {prod_id}</p>
    </div>
  )

}

export default Gallery;