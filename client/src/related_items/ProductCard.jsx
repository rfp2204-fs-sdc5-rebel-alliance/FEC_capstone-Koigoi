import React from 'react';
import styled from 'styled-components';

const RelatedProductCard = ({details}) => {
  // const {prod_id} = useContext(ProdPageContext);
  const placeholder = 'http://placecorgi.com/260/180';
  console.log(details);
  return (
    <IndividualCardStyle>
      <ImageStyle
        src={details.images === null ? placeholder : details.images}
      />
      <CategoryStyle>
        {details.categories}
      </CategoryStyle>
      <NameStyle>
        {details.names}
      </NameStyle>
      <PriceStyle>
        ${details.prices}
      </PriceStyle>
    </IndividualCardStyle>
  )
}

const IndividualCardStyle = styled.div`
  display: tabel-cell, relative;
  position: relative;
  border: 1px solid black;
  mid-width: 250px;
  height: fit-content;
  margin-right: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  object-fit: cover;
`;

const ImageStyle = styled.img`
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 250px;
`;

const CategoryStyle = styled.div`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 15px;
  padding-left: 5px;
`;

const NameStyle = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding-left: 5px;
`;

const PriceStyle = styled.span`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

export default RelatedProductCard;