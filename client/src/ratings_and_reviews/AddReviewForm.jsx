import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const FormSection = styled.div`
  font-size: 14px;
  margin: 20px 0px;

`;

const FormHeading = styled.h4`
`

const RadioButtons = styled.label`
  margin-right: 20px;
`;

const InputText = styled.input`
  margin-right: 10px;
`;

const InputMessage = styled.div`
`

function AddReviewForm ({ prodId, productName }) {
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});
  const [characterCount, setCharacterCount] = useState(50);

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

  const handlePhotos = (event) => {
    const uploadedPhotos = event.target.files;
    let photosArray = [];

    for (let i = 0; i < uploadedPhotos.length; i++) {
      photosArray.push(uploadedPhotos[i].name)
    }

    // setPhotos(photosArray);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newReviewData = {
      product_id: prodId,
      rating: rating,
      summary: summary.target.value,
      body: body.target.value,
      recommend: recommend.target.value,
      name: name.target.value,
      email: email.target.value,
      photos: photos,
      characteristics: characteristics
    }

    console.log(newReviewData);

    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`, {
      headers: {
        Authorization: config.TOKEN
      },
      data: newReviewData
    })
    .then(() => {console.log('Success!')})
    .catch((err) => {console.log(err)})
  }

  return (
    <div>
      <FormSection>
        <h3>About the {productName}</h3>
      </FormSection>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <FormHeading>Overall Rating*</FormHeading>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
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
          <input
            type='file'
            name='image'
            onChange={handlePhotos}
            multiple/>
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