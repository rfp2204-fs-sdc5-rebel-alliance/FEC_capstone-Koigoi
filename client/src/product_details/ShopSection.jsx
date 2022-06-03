import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { AppContext } from '../index.jsx';
import { ProdPageContext } from '../product_page.jsx';
import { ProdDetailsContext } from './ProductDetails.jsx';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa'
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

const AddButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.25rem 1rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  margin: 0 2rem 0 0;
  background: black;
  color: white;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const SocialMedia = styled.div`
  width: 3rem;
  height: 3rem;
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
  const {cart, setCart, showModal, setShowModal, modalBodyContent, setModalBodyContent, modalHeaderContent, setModalHeaderContent} = useContext(AppContext);
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
        setModalHeaderContent(null)
        setModalBodyContent('Added to Cart! Thanks for shopping with koigoi :)')
        setShowModal(true);
        return;
      }
    }

    let tempObj = {'sku': sku, 'name': name, image: image,'style': style, 'price': price, 'size': size, 'quant': Number(quant), quantOptions: quantOptions};
    setCart(cart.concat(tempObj));
    setModalHeaderContent(null)
    setModalBodyContent('Added to Cart!')
    setShowModal(true);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },[cart])


  return ( imageGallery.skus &&
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
        <AddButton onClick={() => {addToCart()}}>Add to Cart</AddButton>
      </ComponentStyle>
      <ComponentStyle>
        <FaFacebook size={50} style={{'marginRight': '1rem', 'marginTop': '1rem', 'cursor': 'pointer'}} onClick={() => {window.open('https://www.facebook.com/')}}/>
        <FaTwitter size={50} style={{'marginRight': '1rem','marginTop': '1rem', 'cursor': 'pointer'}} onClick={() => {window.open('https://www.twitter.com/')}}/>
        <FaPinterest size={50} style={{'marginRight': '1rem','marginTop': '1rem', 'cursor': 'pointer'}} onClick={() => {window.open('https://www.pinterest.com/')}}/>
      </ComponentStyle>
    </Container>
  )

}

export default ShopSection;