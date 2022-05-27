import React, { useState, useContext, useEffect} from 'react';
import config from '../../dist/config.js';
import axios from 'axios';
import styled from 'styled-components';


const FormSection = styled.div`
  margin: 20px 0px;
  `;

const InputText = styled.input`
  margin-right: 10px;
`;

const AddAnswerForm = ({prodName, questionBody, questionId, count, setCount}) => {

  const [answer, setAnswer] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")

  const handleChangeAnswer = (e) => { setAnswer(e.target.value)};
  const handleChangeNickname = (e) => {setNickname(e.target.value)};
  const handleChangeEmail = (e) => {setEmail(e.target.value)};

  const handleClickSubmit = () => {

    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`;

    const data = {
      body: answer,
      name: nickname,
      email: email,
      photos: []
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
    .catch((err) => console.log(err));

  };

  return (
    <div>
      <FormSection>
        <h4> {prodName} : {questionBody}</h4>
      </FormSection>
        <form>
        <FormSection>
          <label> <h5>Your Answer *</h5>
            <textarea name="answer" rows="6" cols="60" maxLength="600" required value={answer}
              onChange={handleChangeAnswer} />
          </label>
        </FormSection>
        <FormSection>
          <h5>Upload your photos</h5>
          <input
            type='file'
            name='image'/>
        </FormSection>
        <FormSection>
          <label> <h5>What is your nickname? *</h5>
            <input name="nickname" type="text" placeholder="Example: jack543!" required value={nickname} size='30' onChange={handleChangeNickname} />
              <br></br>
              <h5>For privacy reasons, do not use your full name or email address</h5>
          </label>
        </FormSection>
        <FormSection>
          <label> <h5>Your email *</h5>
            <input name="email" placeholder="Example: jack@email.com" type="text" required value={email} size='30'
              onChange={handleChangeEmail} />
              <h5>For authentication reasons, you will not be emailed</h5>
          </label>
        </FormSection>
        </form>
        <FormSection>
        <button onClick={handleClickSubmit}>Submit</button>
        </FormSection>
      </div>
  )
};

export default AddAnswerForm;