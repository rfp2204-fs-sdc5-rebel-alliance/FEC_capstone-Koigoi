import React, { useState, useContext} from 'react';
import { ProdPageContext } from '../product_page.jsx';
import axios from 'axios';
import styled from 'styled-components';

const ComparisonModal = (mainId, relatedId) => {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [mainProduct, setMainProduct] = useState([]);

  const getRelatedCharacteristics = () => {
    fetchData('', relatedId)
    .then((relatedInfo) => {
      console.log(relatedInfo);
    })
  }

  return (
    <div>

    </div>
  )
}




export default ComparisonModal;