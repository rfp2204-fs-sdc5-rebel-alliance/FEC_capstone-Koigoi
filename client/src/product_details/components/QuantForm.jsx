import React, { useState, useContext, useEffect } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import {ShopContext} from '../ShopSection.jsx';

const QuantForm = () => {
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);
  const {size, setSize, quant, setQuant} = useContext(ShopContext);

  if (!imageGallery.skus) {
    return null;
  } else {
    return (
      <>
        <option value={0}>Quantity</option>
      </>
    )
  }
}

export default QuantForm;


// return (
//   <option value={imageGallery.skus[sku].quantity}>{imageGallery.skus[sku].quantity}</option>
// )