import React, { useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

const FormSection = styled.div`
  margin: 20px 0px;
  `;

// const RadioButtons = styled.label`
//   margin-right: 20px;
// `;

const InputText = styled.input`
  margin-right: 10px;
`;

const AddQuestionForm = () => {

  const [question, setQuestion] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  // const [name, setName] = useState("")

  const handleChangeQuestion = (e) => { setQuestion(e.target.value)};
  const handleChangeNickname = (e) => {setNickname(e.target.value)};
  const handleChangeEmail = (e) => {setEmail(e.target.value)};

  const handleClickSubmit = () => {};

  return (
    <div>
      <FormSection>
        <h4>About the [Product Name]</h4>
      </FormSection>
        <form>
        <FormSection>
          <label> <h5>Your Question *</h5>
            <textarea name="question" rows="4" cols="40" maxLength="600" required value={() => setQuestion(question)}
              onChange={handleChangeQuestion} />
          </label>
        </FormSection>
        <FormSection>
          <label> <h5>What is your nickname? *</h5>
            <input name="nickname" type="text" placeholder="Example: jackson11!" required value={()=> setNickname(nickname)}
              onChange={handleChangeNickname} />
              <br></br>
              <h5>For privacy reasons, do not use your full name or email address</h5>
          </label>
        </FormSection>
        <FormSection>
          <label> <h5>Your email *</h5>
            <input name="password" placeholder="Why did you like the product or not?" type="text" required value={() => setEmail(email)}
              onChange={handleChangeEmail} />
              <h5>For authentication reasons, you will not be emailed</h5>
          </label>
        </FormSection>
        </form>
        <button onClick={handleClickSubmit}>Submit</button>
      </div>
  )
}

export default AddQuestionForm;