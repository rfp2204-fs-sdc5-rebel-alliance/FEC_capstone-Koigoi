import React, { useState, useContext, useEffect } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import {ShopContext} from '../ShopSection.jsx';

const QuantForm = () => {
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);
  const {size, setSize, quant, setQuant, quantOptions} = useContext(ShopContext);

  return ( imageGallery.skus &&
    quantOptions.map((quant, index) => {
      return (
        <option key={index} value={quant}>{quant}</option>
      )
    })
  );
};

export default QuantForm;