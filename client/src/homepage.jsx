import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import axios from 'axios';
import { AppContext } from './index.jsx';
import styled from 'styled-components';

const BannerStyle = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;
  background-color: black;
  &:hover {
    .bannerText {
      visibility: visible;
    }
  }
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerText = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
  color: white;
  visibility: hidden;
  -webkit-transition: visibility 0s, opacity 0.5s linear;
  transition: visibility 0s, opacity 0.5s linear;
`

const HomePage = () => {
  const { cart, setCart } = useContext(AppContext);

  return (
    <div>
      <BannerStyle>
        <ImgStyle src="https://i.gifer.com/g32L.gif" alt="No Fish :(" />
        <BannerText className="bannerText" >Shop Zen.</BannerText>
      </BannerStyle>
      <h1>no frills, just clothes and koi fish.</h1>
    </div>
  )
}

export default HomePage;