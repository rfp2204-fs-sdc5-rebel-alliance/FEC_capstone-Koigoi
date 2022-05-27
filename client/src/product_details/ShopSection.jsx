import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { AppContext } from '../index.jsx';
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

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem 0 1rem;
`;

export const ShopContext = createContext();

const ShopSection = () => {
  const {cart, addCart} = useContext(AppContext);
  const {prod_id} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);
  const [sku, setSku] = useState('');
  const [size, setSize] = useState('');
  const [quantOptions, setQuantOptions] = useState([]);
  const [quant, setQuant] = useState(0);

  //console.log('imageGallery:', imageGallery);

  let onSelectSize = (sku) => {
    if (sku === 'Select') {
      setSize('');
      setQuantOptions([]);
      return;
    }
    setSku(sku);
    setSize(imageGallery.skus[sku].size);
    let maxQuant = Math.min(15, imageGallery.skus[sku].quantity);
    let tempArray = [];
    while (maxQuant > 0) {
      tempArray.unshift(maxQuant);
      maxQuant--;
    }
    setQuantOptions(tempArray);
  }

  let getQuant = () => {
    quantOptions.map(quant => {
      return (
        <option value={quant}>{quant}</option>
      )
    })
  }

  if (!imageGallery.skus) {
    return null;
  } else {
    return (
      <Container>
        <FormStyle>
          <SelectStyle onChange={() => {onSelectSize(event.target.value)}}>
            <option value={'Select'}>Size</option>
            {
              Object.keys(imageGallery.skus).map((sku, index) => {
                return (
                  <option key={index} value={sku}>{imageGallery.skus[sku].size}</option>
                )
              })
            }
          </SelectStyle>
          <ShopContext.Provider value={{size, setSize, quant, setQuant, quantOptions}}>
            <SelectStyle onChange={() => {setQuant(event.target.value)}}>
                <option value={0}>Quantity</option>
                <QuantForm />
            </SelectStyle>
          </ShopContext.Provider>
        </FormStyle>
        <FormStyle>
          <ButtonStyle onClick={() => {setCart(cart.concat({'sku': sku, 'size': size, 'quant': quant}))}}>Add to Cart</ButtonStyle>
        </FormStyle>
      </Container>
    )
  }

}

export default ShopSection;