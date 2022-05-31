import React, { useState, createContext } from "react";
import { render } from "react-dom";
import axios from 'axios';

import styled, {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme, GlobalStyle} from './themes.js';
import ProductPage from './product_page.jsx';
import HomePage from './homepage.jsx';
import Checkout from './checkout.jsx';
import Modal from './shared_components/Modal.jsx';

export const AppContext = createContext();

const AppStyle = styled.div`
  color: ${props => props.theme.fontColor}
`;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []);
  const [view, setView] = useState('Product');
  const [showModal, setShowModal] = useState(false);
  const [modalBodyContent, setModalBodyContent] = useState(null);
  const [modalHeaderContent, setModalHeaderContent] = useState(null);

  const themeToggle = () => {
    console.log('toggle clicked');
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const changeView = (name) => {
    console.log('Changing view to ' + name);
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
            <h1>Cyclops Inc.</h1>
            <ul>
              <li onClick={() => {themeToggle()}}>Toggle</li>
              <li onClick={() => {changeView('Home')}}>Home</li>
              <li onClick={() => {changeView('Product')}}>Product</li>
              <li onClick={() => {changeView('Checkout')}}>Shopping Cart</li>
            </ul>

          </nav>
        </header>
        <AppContext.Provider value={{cart, setCart, showModal, setShowModal, modalBodyContent, setModalBodyContent, modalHeaderContent, setModalHeaderContent}}>
          <h1>{renderView()}</h1>
          <Modal />
        </AppContext.Provider>
      </AppStyle>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById("root"));