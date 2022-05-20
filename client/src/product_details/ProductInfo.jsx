import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import config from '../../dist/config.js';

//may need to import more stuff to begin work

const ProductInfo = () => {
  const {prod_id} = useContext(ProdPageContext);

  return (
  )

}

export default ProductInfo;