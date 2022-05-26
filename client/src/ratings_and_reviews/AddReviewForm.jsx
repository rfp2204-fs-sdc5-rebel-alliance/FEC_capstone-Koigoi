import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const FormSection = styled.div`
  margin: 20px 0px;
  `;

const RadioButtons = styled.label`
  margin-right: 20px;
`;

const InputText = styled.input`
  margin-right: 10px;
`;

function AddReviewForm ({ prodId, productName }) {
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});

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

    // setRating();
    let newReviewData = {
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

    newReviewData = JSON.stringify(newReviewData);

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
        <h4>About the {productName}</h4>
      </FormSection>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <h5>Overall Rating*</h5>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </FormSection>
        <FormSection>
          <h5>Do you recommend this product?*</h5>
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
          <h5>Characteristics*</h5>
        </FormSection>
        <FormSection>
          <h5>Review Summary</h5>
          <input
            type='text'
            name='summary'
            size='60'
            onChange={setSummary}/>
        </FormSection>
        <FormSection>
          <h5>Review Body*</h5>
          <textarea
            name='body'
            rows='10'
            cols='100'
            maxLength='1000'
            onChange={setBody}
            required>
          </textarea>
        </FormSection>
        <FormSection>
          <h5>Upload your photos</h5>
          <input
            type='file'
            name='image'
            onChange={handlePhotos}
            multiple/>
        </FormSection>
        <FormSection>
          <h5>What is your nickname*</h5>
          <input
            type='text'
            name='nickname'
            size='60'
            onChange={setName}
            required/>
        </FormSection>
        <FormSection>
          <h5>Email*</h5>
          <input
            type='email'
            name='summary'
            size='60'
            onChange={setEmail}
            required/>
        </FormSection>
        <FormSection>
          <input type ='submit' value='Submit'/>
        </FormSection>
      </form>
    </div>
  );
}

export default AddReviewForm;