import React, { useState, createContext, useContext } from "react";
import { render } from "react-dom";
import { AppContext } from './index.jsx';
import styled from 'styled-components';

const BannerStyle = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;
  background-color: black;
  margin-bottom: 2rem;
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
  box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
`;

const BannerText = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
  font-size: 30px;
  font-weight: bold;
  color: #FFFAFA;
  visibility: hidden;
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Locations = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const FeaturedItems = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
`;

const ProductStyle = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 30%;
  height: auto;
  cursor: pointer;
  padding-top: 1rem;
  border-top: 0.2rem solid ${props => props.theme.fontColor};
`;

const AboutStyle = styled(ProductStyle)`
  &:hover {
    .bannerText2 {
      visibility: visible;
    }
  }
`;

const SectionBanner = styled(BannerText)`
  left: 27.5%;
`;

const HomePage = () => {
  const { cart, setCart, setProd, setView } = useContext(AppContext);

  return (
    <div>
      <BannerStyle>
        <ImgStyle src="https://i.gifer.com/g32L.gif" alt="No Fish :(" />
        <BannerText className="bannerText" >Shop Zen.</BannerText>
      </BannerStyle>
      <h1 style={{'marginBottom':'2rem', 'textAlign': 'center'}}>no frills. just clothes and koi.</h1>
      <MainWrapper>
        <Locations>
          <h2>Stores</h2>
          <p>Diamond Bar, CA ★</p>
          <p>Los Angeles, CA ★</p>
          <p>Glendora, CA ★</p>
          <p>San Jose, CA ★</p>
          <p>Rowland Heights, CA</p>
          <p>Whittier, CA</p>
          <p>Sunnyvale, CA</p>
          <p>Irvine, CA</p>
          <p>Arcadia, CA</p>
          <p>Renton, WA</p>
          <p>Kent, WA</p>
          <p>Las Vegas, NV</p>
          <p>Sierra Vista, AZ</p>
        </Locations>
        <ItemsContainer>
          <FeaturedItems>
              <ProductStyle>
                <ImgStyle src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" onClick={() => {setProd(40344); setView('Product')}}></ImgStyle>
              </ProductStyle>
              <div style={{'visibility': 'hidden'}}>K</div>
              <ProductStyle>
                <ImgStyle src="https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" onClick={() => {setProd(40346); setView('Product')}}></ImgStyle>
              </ProductStyle>
              <div style={{'visibility': 'hidden'}}>K</div>
              <AboutStyle onClick={() => {setView('About')}}>
                <ImgStyle src="https://ih1.redbubble.net/image.623055286.9686/flat,750x1000,075,t.jpg"></ImgStyle>
                <SectionBanner className="bannerText2">About Us.</SectionBanner>
              </AboutStyle>
          </FeaturedItems>
        </ItemsContainer>
      </MainWrapper>
    </div>
  );
};

export default HomePage;