import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: flex-start;
  width: 100%;
`;

export const CardStyle = styled.div`
  display: block;
  margin: 15px;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 240px;
  height: fit-content;
  overflow: hidden;
  border-radius: 3px;
  border-style: solid;
  border-width: .5px;
  &:hover {
    box-shadow: 0px 0px 5px rgba(90, 90, 90, 0.8);
  }
`;

export const ImageWrapper = styled.div`
  height: 230px;
  width: 240px;
  overflow: hidden;
  object-fit: cover;
`;

export const ImageStyle = styled.img`
  display: block;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px 16px 0 0;
`;

export const InfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: .05px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 17px;
  text-transform: none;
  font-weight: 500;
  padding-left: 5px;
`;

export const CategoryStyle = styled.span`
  font-weight: 350;
`;

export const PriceStyle = styled.div`
  display: flex;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  text-transform: none;
  color: ${(props) => props.theme.fontColor};
  font-weight: 500;
  padding: 2px 4px;
  position: relative;
  bottom: 38px;
  background-color: ${(props) => props.theme.body};
  border-radius: 3px;
  cursor: pointer;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.body};
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-3px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export const SalesPrice = styled.div`
  color: red;
  padding-left: 5px;
`;

export const OriginalPrice = styled.div`
  text-decoration: line-through;
`;


export const Arrow = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 145px;
  cursor: pointer;
  user-select: none;
  transform: scale(0.75);
  &:hover,
  &:focus {
    transform: scale(1.0);
  }
`;

export const ArrowTransparent = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 145px;
  visibility: hidden;
`;

export const RelatedButtonStyle = styled.button`
  bottom: 220px;
  left: 205px;
  position: relative;
  border: 1px solid #1A1A1A;
  border-radius: 15px;
  color: #3B3B3B;
  cursor: pointer;
  line-height: normal;
  padding: 2px 3px;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: yellow;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export const OutfitButtonStyle = styled.button`
  bottom: 220px;
  left: 205px;
  position: relative;
  border: 1px solid #1A1A1A;
  border-radius: 15px;
  color: #3B3B3B;
  cursor: pointer;
  line-height: normal;
  padding: 2px 3px;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: red;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;