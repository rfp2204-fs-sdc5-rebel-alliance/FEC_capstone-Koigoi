import React, { useState, useContext, useEffect} from 'react';
import { AppContext } from '../index.jsx';
import config from '../../dist/config.js';
import axios from 'axios';
import styled from 'styled-components';
import ImageUpload from '../shared_components/ImageUpload.jsx';

const FormSection = styled.div`
  margin: 20px 0px;
  `;
const FormHeading = styled.h4`
`;
const InputText = styled.input`
  margin-right: 10px;
`;

const AddAnswerForm = ({prodName, questionBody, questionId, count, setCount}) => {

  const { setShowModal } = useContext(AppContext);
  const [answer, setAnswer] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleChangeAnswer = (e) => { setAnswer(e.target.value)};
  const handleChangeNickname = (e) => {setNickname(e.target.value)};
  const handleChangeEmail = (e) => {setEmail(e.target.value)};

  const handleClickSubmit = () => {

    event.preventDefault();

    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`;

    const data = {
      body: answer,
      name: nickname,
      email: email,
      photos: photos
    }
    axios.post(url, data, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((response) => {
      console.log('success')
    })
    .then(() => {setCount(count + 1)})
    .catch((err) => console.log(err))
    .then(() => setShowModal(false))

  };

  return (
    <div>
      <FormSection>
        <h4> {prodName} : {questionBody}</h4>
      </FormSection>
        <form onSubmit={handleClickSubmit}>
        <FormSection>
          <label>
           <h5>Your Answer *</h5>
            <textarea name="answer" rows="6" cols="60" maxLength="600"
               value ={answer} onChange={handleChangeAnswer} required/>
          </label>
        </FormSection>
        <FormSection>
          <FormHeading>Upload your photos</FormHeading>
          <ImageUpload photos={photos} setPhotos={setPhotos}/>
        </FormSection>
        <FormSection>
          <label>
          <h5>What is your nickname? *</h5>
            <input name="nickname" type="text" placeholder="Example: jack543!"   size='30' value={nickname} onChange={handleChangeNickname} required/>
              <br></br>
              <h5>For privacy reasons, do not use your full name or email address</h5>
          </label>
        </FormSection>
        <FormSection>
          <label>
          <h5>Your email *</h5>
            <input name="email" placeholder="Example: jack@email.com" type="email"  size='30' value={email}
              onChange={handleChangeEmail} required/>
              <h5>For authentication reasons, you will not be emailed</h5>
          </label>
        </FormSection>
        <FormSection>
          <input type ='submit' value='Submit' />
        </FormSection>
        </form>
      </div>
  )
};

export default AddAnswerForm;