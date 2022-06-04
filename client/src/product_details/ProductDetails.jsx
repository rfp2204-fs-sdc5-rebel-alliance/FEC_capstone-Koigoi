import React, { useState, createContext, useContext, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {ProdPageContext} from '../product_page.jsx';
import Gallery from './Gallery.jsx';
import ExpandedView from './ExpandedView.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductDesc from './ProductDesc.jsx';
import ProductFeatures from './ProductFeatures.jsx';
import ShopSection from './ShopSection.jsx';

export const ProdDetailsContext = createContext();

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductDetails = () => {
  const {prod_id, setProdName} = useContext(ProdPageContext);
  const [index, setIndex] = useState(0);
  const [prodObj, setProdObj] = useState({});
  const [prodStyles, setProdStyles] = useState({});
  const [imageGallery, setGallery] = useState({});
  const [expanded, setExpanded] = useState(false);

  let getImages = () => {
    axios.get(`/FEC/products/${prod_id}/styles`)
    .then((results) => {
      setProdStyles(results);
      results.data.results.forEach((style) => {
        if (style['default?'] === true) {
          setGallery(style);
        }
      })
    })
    .catch((err) => console.log(err));
  };

  let getInfo = () => {
    axios.get(`/FEC/products/${prod_id}`)
    .then((results) => {
      setProdObj(results);
      setProdName(results.data.name);
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    getImages();
    getInfo();
  }, [prod_id]);

  if (expanded) {
    return (
      <ProdDetailsContext.Provider value={{index, setIndex, prodObj, setProdObj, prodStyles, setProdStyles, imageGallery, setGallery, expanded, setExpanded}}>
      <MainWrapper>
        <ExpandedView />
      </MainWrapper>
      <MainWrapper>
        <ProductDesc />
        <ProductFeatures />
      </MainWrapper>
    </ProdDetailsContext.Provider>
    );
  };

  return (
    <ProdDetailsContext.Provider value={{index, setIndex, prodObj, setProdObj, prodStyles, setProdStyles, imageGallery, setGallery, expanded, setExpanded}}>
      <MainWrapper>
        <Gallery />
        <ProductInfo />
      </MainWrapper>
      <MainWrapper>
        <ProductDesc />
        <ProductFeatures />
      </MainWrapper>
    </ProdDetailsContext.Provider>
  );
};

export default ProductDetails;
