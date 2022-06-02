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
  display: block;
  align-items: left;
`;

const ComponentStyle = styled.div`
  display: flex;
  margin: 1rem;
`;

const SelectStyle = styled.select`
  display: flex;
  appearance: none;
  width: 6rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  margin: 0 2rem 0 0;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const ButtonStyle = styled.button`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  color: #fff;
  background: #111;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const SocialMedia = styled.img`
  width: 3rem;
  height: auto;
  margin-right: 1rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

export const ShopContext = createContext();

const ShopSection = () => {
  const {cart, setCart} = useContext(AppContext);
  const {prod_id} = useContext(ProdPageContext);
  const {prodObj, setProdObj, prodStyles, setProdStyles, imageGallery} = useContext(ProdDetailsContext);
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState(0);
  const [style, setStyle] = useState('');
  const [size, setSize] = useState('');
  const [image, setImage] = useState('No Image');
  const [quantOptions, setQuantOptions] = useState([]);
  const [quant, setQuant] = useState(0);

  let onSelectSize = (sku) => {
    setName(prodObj.data.name);

    if (imageGallery.sale_price) {
      setPrice(imageGallery.sale_price);
    } else {
      setPrice(imageGallery.original_price);
    }

    if (sku === 'Select') {
      setSize('');
      setQuantOptions([]);
      return;
    }

    if (imageGallery.photos.length) {
      setImage(imageGallery.photos[0].thumbnail_url);
    }

    setSku(sku);
    setSize(imageGallery.skus[sku].size);
    setStyle(imageGallery.name)
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

  let addToCart = () => {
    if (sku === '' || size === '') {
      alert('Please select a size.');
      return;
    }
    if (quant === 0 || quant === '0') {
      alert('Please select an item quantity.');
      return;
    }

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].sku === sku) {
        let tempArray = [...cart];
        tempArray[i].quant += Number(quant);
        setCart(tempArray);
        return;
      }
    }

    let tempObj = {'sku': sku, 'name': name, image: image,'style': style, 'price': price, 'size': size, 'quant': Number(quant), quantOptions: quantOptions};
    setCart(cart.concat(tempObj));
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },[cart])

  if (!imageGallery.skus) {
    return null;
  } else {
    return (
      <Container>
        <ComponentStyle>
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
          <ButtonStyle onClick={() => {addToCart()}}>Add to Cart</ButtonStyle>
        </ComponentStyle>
        <ComponentStyle>
          <SocialMedia src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" onClick={() => {window.open('https://www.facebook.com/')}}/>
          <SocialMedia src="https://cdn-icons.flaticon.com/png/512/3256/premium/3256013.png?token=exp=1654192040~hmac=caa749884f07b72e0c9d30d9fa1542a4" alt="Twitter" onClick={() => {window.open('https://www.twitter.com/')}} />
          <SocialMedia src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536559.png?token=exp=1654194532~hmac=d3c2a9338f6256a3862d3e4dd2b10424" alt="Pinterest" onClick={() => {window.open('https://www.pinterest.com/')}}/>
        </ComponentStyle>
      </Container>
    )
  }

}

export default ShopSection;