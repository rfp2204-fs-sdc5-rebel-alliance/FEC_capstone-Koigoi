import React, { useState, createContext, useContext, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {ProdPageContext} from '../product_page.jsx';
import config from '../../dist/config.js';

//may need to import more stuff to begin work
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductDesc from './ProductDesc.jsx';
import ProductFeatures from './ProductFeatures.jsx';
import ShopSection from './ShopSection.jsx';

export const ProdDetailsContext = createContext();

const MainWrapper = styled.div`
  width: 100%;
  border: 0.5rem solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ProductDetails = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [index, setIndex] = useState(0);
  const [prodObj, setProdObj] = useState({});
  const [prodStyles, setProdStyles] = useState({});
  const [imageGallery, setGallery] = useState([]);

  let getImages = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prod_id}/styles`, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((results) => {
      console.log('prodStyles:', results);
      setProdStyles(results);
      results.data.results.forEach((style) => {
        if (style['default?'] === true) {
          console.log('current style:', style);
          setGallery(style);
        }
      })
    })
    .catch((err) => console.log(err));
  }

  let getInfo = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prod_id}`, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((results) => {
      console.log('prodObj:', results);
      setProdObj(results);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getImages();
    getInfo();
  }, [prod_id]);

  return (
    <ProdDetailsContext.Provider value={{index, setIndex, prodObj, setProdObj, prodStyles, setProdStyles, imageGallery, setGallery}}>
      <MainWrapper>
        <Gallery />
        <ProductInfo />
      </MainWrapper>
      <MainWrapper>
        <ProductDesc />
        <ProductFeatures />
      </MainWrapper>
    </ProdDetailsContext.Provider>

  )

}

export default ProductDetails;
