import React, { useContext } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import styled from 'styled-components';

const EmptyCard = ({saveToStorage}) => {
  const {prod_id} = useContext(ProdPageContext);
  return (
    <IndividualCardStyle className='CardStyle'>
      <AddIcon onClick={(e) => saveToStorage(e, prod_id)}>
        Add To Outfit
      </AddIcon>
    </IndividualCardStyle>
  )
}

const IndividualCardStyle = styled.div`
  display: block;
  margin: 15px;
  flex-direction: column;
  flex-wrap: nowrap;
  min-width: 240px;
  height: 290px;
  object-fit: contain;
  overflow: hidden;
  text-align: center;
`;

const AddIcon = styled.button`
  align-items: center;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  color: #3c4043;
  cursor: pointer;
  font-size: 14px;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  padding: 2px 24px;
  position: relative;
  top: 40%;
  font-family: "Google Sans",Roboto,Arial,sans-serif;

  &:hover {
  background: #F6F9FE;
  color: #174ea6;
  }

  &:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
  }

  &:focus {
  outline: none;
  border: 2px solid #4285f4;
  }

  &:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }

  &:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
  }

  &:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }

  &:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
  }

  &:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
`;

export default EmptyCard;