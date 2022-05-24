import React, { useState, useContext } from 'react';
import {ProdDetailsContext} from '../ProductDetails.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const ListStyle = styled.div`
  border: 0.5rem solid green;
  display: block;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
`;

const StylesBlock = (slides) => {
  const {index, setIndex} = useContext(ProdDetailsContext);

  return (
    <ListStyle>
      StylesBlock placeholder.
    </ListStyle>
  )
}

export default StylesBlock;