import React, { useState, useContext, useEffect } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import {ShopContext} from '../ShopSection.jsx';

const QuantForm = () => {
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);
  const {size, setSize, quant, setQuant, quantOptions} = useContext(ShopContext);

  if (!imageGallery.skus) {
    return null;
  } else {
    return (
      quantOptions.map((quant, index) => {
        return (
          <option key={index} value={quant}>{quant}</option>
        )
      })
    )
  }
}

export default QuantForm;