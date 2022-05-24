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

function AddReviewForm () {

  return (
    <div>
      <FormSection>
        <h4>About the [Product Name Here]</h4>
      </FormSection>
      <form>
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
              value='Yes'
              required/>
            Yes
          </RadioButtons>
          <RadioButtons>
            <InputText
              type='radio'
              name='recommend'
              value='No'
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
            size='60'/>
        </FormSection>
        <FormSection>
          <h5>Review Body*</h5>
          <textarea
            name='body'
            rows='10'
            cols='100'
            maxLength='1000'
            required>
          </textarea>
        </FormSection>
        <FormSection>
          <h5>Upload your photos</h5>
          <input
            type='file'
            name='image'/>
        </FormSection>
        <FormSection>
          <h5>What is your nickname*</h5>
          <input
            type='text'
            name='nickname'
            size='60'
            required/>
        </FormSection>
        <FormSection>
          <h5>Email*</h5>
          <input
            type='email'
            name='summary'
            size='60'
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