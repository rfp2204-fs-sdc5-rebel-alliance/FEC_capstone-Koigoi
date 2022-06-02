import React, { useState, createContext } from "react";
import { render } from "react-dom";

import styled, {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme, GlobalStyle} from './themes.js';
import ProductPage from './product_page.jsx';
import HomePage from './homepage.jsx';
import Checkout from './checkout.jsx';
import Modal from './shared_components/Modal.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHouse, faShirt } from '@fortawesome/free-solid-svg-icons';

export const AppContext = createContext();

const AppStyle = styled.div`
  color: ${props => props.theme.fontColor};

`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 5px;
  right: 2px;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  background: #36393E;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 3px;
    background: #FFFAFA;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 9999;
  border-radius: 15px;
  width: 30px;
  height: 15px;
  &:checked + ${CheckBoxLabel} {
    background: #FFFAFA;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      margin-left: 20px;
      transition: 0.2s;
      background: #36393E;
    }
  }
`;

const CartCount = styled.span`
  position: relative;
  bottom: 8px;
`;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []);
  const [view, setView] = useState('Home');
  const [prod_id, setProd] = useState(40344);
  const [showModal, setShowModal] = useState(false);
  const [modalBodyContent, setModalBodyContent] = useState(null);
  const [modalHeaderContent, setModalHeaderContent] = useState(null);

  const themeToggle = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const changeView = (name) => {
    setView(name);
  }

  const renderView = () => {
    switch (view) {
      case "Home":
        return <HomePage />;
      case "Product":
        return <ProductPage />;
      case "Checkout":
        return <Checkout />;
      default:
        return <HomePage />;
    }
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppStyle>
        <header>
          <nav>
            <h1 style={{'cursor': 'pointer'}} onClick={() => {setView('Home')}}>koigoi</h1>
            <ul>
              <li>
                <div>
                  <CheckBoxWrapper>
                    <CheckBox id="checkbox" type="checkbox" onChange={themeToggle}/>
                    <CheckBoxLabel htmlFor="checkbox" />
                  </CheckBoxWrapper>
                </div>
              </li>
              <li>
                <FontAwesomeIcon style={{'cursor': 'pointer'}} icon={faHouse} onClick={() => {changeView('Home')}}/>
              </li>
              <li>
                <FontAwesomeIcon style={{'cursor': 'pointer'}} icon={faShirt} onClick={() => {changeView('Product')}}/>
              </li>
              <li style={{'cursor': 'pointer'}}>
                <FontAwesomeIcon icon={faShoppingCart} onClick={() => {changeView('Checkout')}}/>
                <CartCount>{cart.length || ''}</CartCount>
              </li>
            </ul>

          </nav>
        </header>
        <AppContext.Provider value={{prod_id, setProd, setView, cart, setCart, showModal, setShowModal, modalBodyContent, setModalBodyContent, modalHeaderContent, setModalHeaderContent}}>
          <div>{renderView()}</div>
          <Modal />
        </AppContext.Provider>
      </AppStyle>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById("root"));