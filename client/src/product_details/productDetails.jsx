import React, { useState, createContext, useContext} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {ProdPageContext} from '../product_page.jsx';

//may need to import more stuff to begin work
import Gallery from './Gallery.jsx';

export const ProdDetailsContext = createContext();

const ProductDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <p>This is Kevin's Product Details section!</p>
      <ProdDetailsContext.Provider value={{index, setIndex}}>
        <Gallery />
      </ProdDetailsContext.Provider>
    </div>
  )

}

export default ProductDetails;