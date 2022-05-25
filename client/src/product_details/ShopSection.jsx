import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import styled from 'styled-components';
import config from '../../dist/config.js';

//may need to import more stuff to begin work
import QuantForm from './components/QuantForm.jsx';

const Container = styled.div`
  width: 100%;
  border: 0.5rem solid green;
  display: block;
  justify-content: center;
  align-items: center;
`;

const FormStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const SelectStyle = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem 0 1rem;
`;

export const ShopContext = createContext();

const ShopSection = () => {
  const {prod_id} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);
  const [size, setSize] = useState('');
  const [quantOptions, setQuantOptions] = useState([]);
  const [quant, setQuant] = useState(0);

  console.log('imageGallery:', imageGallery);

  if (!imageGallery.skus) {
    return null;
  } else {
    return (
      <Container>
        <FormStyle>
          <SelectStyle onChange={() => {setSize(event.target.value)}}>
            <option value={0}>Size</option>
            {
              Object.keys(imageGallery.skus).map(sku => {
                return (
                  <option value={imageGallery.skus[sku].size}>{imageGallery.skus[sku].size}</option>
                )
              })
            }
          </SelectStyle>
          <ShopContext.Provider value={{size, setSize, quant, setQuant}}>
            <SelectStyle>
              <QuantForm />
            </SelectStyle>
          </ShopContext.Provider>
        </FormStyle>
        <FormStyle>
          <button onClick={() => {console.log({'size': size, 'quant': quant})}}>Add to Cart</button>
        </FormStyle>
      </Container>
    )
  }

}

export default ShopSection;