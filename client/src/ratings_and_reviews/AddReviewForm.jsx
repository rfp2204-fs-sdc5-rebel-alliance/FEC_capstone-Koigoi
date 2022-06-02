import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import ImageUpload from '../shared_components/ImageUpload.jsx';
import { AppContext } from '../index.jsx';

const FormSection = styled.div`
  font-size: 14px;
  margin: 20px 0px;
`;

const FormHeading = styled.h4`
`
const StarRatingInput = styled.input`
  &[type='radio'] {
    display:none
  }
`;

const RadioButtons = styled.label`
  margin-right: 20px;
`;

const InputText = styled.input`
  margin-right: 10px;
`;

const InputMessage = styled.div`

`
const CharacteristicContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0px;
`;

const CharacteristicName = styled.h4`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 60px;
`;

const CharacteristicBodyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CharacteristicLabelsContainer = styled.div`
  display: flex;
  align-contents: center;
  height: 25px;
`;

const CharacteristicRadioButtons = styled.input`
  display: flex;
  align-contents: center;
  height: 20px;
  background: red;
`;

const CharacteristicOptions = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

function AddReviewForm ({ prodId, productName, characteristics, characteristicLabels, showCharacteristicLabel, setShowCharacteristicLabel, setShowModal }) {
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristicsValue, setCharacteristicsValue] = useState({});
  const [characterCount, setCharacterCount] = useState(50);

  const { theme } = useContext(AppContext);

  useEffect (() => {
    renderCharacteristicsInput();

  }, [characteristicsValue])

  const handleBody = (event) => {
    let bodyContent = event.target.value;
    let bodyLength = event.target.value.length;

    setBody(bodyContent);

    if (bodyLength >= 50) {
      setCharacterCount('Minimum reached')
    } else {
      setCharacterCount(50 - (bodyLength));
    }
  }

  const handleCharacteristics = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    const index = event.target.value - 1;
    setCharacteristicsValue(showCharacteristicLabel[key] = [false, false, false, false, false]);
    setCharacteristicsValue(showCharacteristicLabel[key][index] = true);
    setCharacteristicsValue({...characteristicsValue, [characteristics[key].id]: Number(value)});
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let recommendToBool = recommend.target.value;

    if (recommendToBool === 'true') {
      recommendToBool = true;
    } else {
      recommendToBool = false;
    }

    const newReviewData = {
      'product_id': prodId,
      'rating': rating,
      'summary': summary.target.value,
      'body': body,
      'recommend': recommendToBool,
      'name': name.target.value,
      'email': email.target.value,
      'photos': photos,
      'characteristics': characteristicsValue
    }

    axios.post(`/FEC/reviews/`, newReviewData)
    .then(() => {setShowModal(false)})
    .catch((err) => {
      console.log(err)
    })
  }

  const StarRating = () => {
    const starStyles = {

    }
    let selectedStar = theme === 'light' ? '#36393E' : '#FFFAFA';
    let defaultStar = theme === 'light' ? '#FFFAFA' : '#36393E';
    return (
      <div>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <StarRatingInput
                type='radio'
                name='rating'
                value={ratingValue}
                onClick={() => {setRating(ratingValue)}}
                required/>
              <FontAwesomeIcon
                style={{'stroke': selectedStar, 'stroke-width': '10'}}
                icon={faStar}
                size='2x'
                color={ratingValue <= (ratingHover || rating) ? selectedStar : defaultStar}
                onMouseEnter={() => {setRatingHover(ratingValue)}}
                onMouseLeave={() => {setRatingHover(null)}}/>
            </label>
          )
        })}
      </div>
    )
  }

  let characteristicsFormLayout = [];

  const renderCharacteristicsInput = () => {
    characteristicsFormLayout = [];

    Object.keys(characteristics).forEach((characteristic) => {
      let characteristicOptions = [];
      let footerLabel = null;

      [...Array(5)].map((label, index) => {
        console.log(index);
        if (index === 0) {
          footerLabel = characteristicLabels[characteristic][index]
        } else if (index === 4) {
          footerLabel = characteristicLabels[characteristic][index]
        } else {
          footerLabel = null;
        }

        characteristicOptions.push(
          <CharacteristicOptions key={index}>
              <div style={showCharacteristicLabel[characteristic][index] ? {'visibility': 'visible'} : {'visibility': 'hidden'}}>{characteristicLabels[characteristic][index]}</div>
              <CharacteristicRadioButtons
                type='radio'
                name={characteristic}
                value={index + 1}
                onChange={handleCharacteristics}
                required/>
              <CharacteristicLabelsContainer>{footerLabel}</CharacteristicLabelsContainer>
            </CharacteristicOptions>
        )
      });

      characteristicsFormLayout.push(
        <CharacteristicContainer>
          <CharacteristicName>{characteristic}</CharacteristicName>
          <CharacteristicBodyContainer>
            {characteristicOptions}
          </CharacteristicBodyContainer>
        </CharacteristicContainer>
      );
    })
  }

  renderCharacteristicsInput();

  return (
    <div>
      <FormSection>
        <h3>About the {productName}</h3>
      </FormSection>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <FormHeading>Overall Rating*</FormHeading>
          {StarRating()}
        </FormSection>
        <FormSection>
          <FormHeading>Do you recommend this product?*</FormHeading>
          <RadioButtons>
            <InputText
              type='radio'
              name='recommend'
              value={true}
              onChange={setRecommend}
              required/>
            Yes
          </RadioButtons>
          <RadioButtons>
            <InputText
              type='radio'
              name='recommend'
              value={false}
              onChange={setRecommend}
              required/>
            No
          </RadioButtons>
        </FormSection>
        <FormSection>
          <FormHeading>Characteristics*</FormHeading>
            {characteristicsFormLayout.map((element, index) =>
              <div key={index}>{element}</div>
            )}
        </FormSection>
        <FormSection>
          <FormHeading>Review Summary</FormHeading>
          <input
            type='text'
            name='summary'
            size='60'
            placeholder="Example: Best purchase ever!"
            onChange={setSummary}/>
        </FormSection>
        <FormSection>
          <FormHeading>Review Body*</FormHeading>
          <textarea
            name='body'
            rows='10'
            cols='100'
            minLength='50'
            maxLength='1000'
            placeholder="Why did you like the product or not?"
            onChange={handleBody}
            required>
          </textarea>
          <InputMessage>Minimum required characters left: {characterCount}</InputMessage>
        </FormSection>
        <FormSection>
          <FormHeading>Upload your photos</FormHeading>
          <ImageUpload photos={photos} setPhotos={setPhotos}/>
        </FormSection>
        <FormSection>
          <FormHeading>What is your nickname*</FormHeading>
          <input
            type='text'
            name='nickname'
            size='60'
            placeholder='Example: jackson11!'
            onChange={setName}
            required/>
            <InputMessage>For privacy reasons, do not use your full name or email address</InputMessage>
        </FormSection>
        <FormSection>
          <FormHeading>Email*</FormHeading>
          <input
            type='email'
            name='summary'
            size='60'
            placeholder='Example: jackson11@email.com'
            onChange={setEmail}
            required/>
            <InputMessage>For authentication reasons, you will not be emailed</InputMessage>
        </FormSection>
        <FormSection>
          <input type ='submit' value='Submit'/>
        </FormSection>
      </form>
    </div>
  );
}

export default AddReviewForm;