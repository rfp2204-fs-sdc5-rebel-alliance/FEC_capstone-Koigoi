import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { QuestionContext } from './QuestionList.jsx';
import AddPhotos from './AddPhotos.jsx';
import formattedDate from '../shared_components/formattedDate.js'
import styled from 'styled-components';

const StyledAnswer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const StyledAnswerInfo = styled.div`
  font-size: 12px;
  margin-top: 4px;
  margin-left: 116px;
  margin-bottom: 4px;
`;

const Answer = (props) => {

  const { count, setCount } = useContext(QuestionContext);
  const [reported, setReported] = useState(false);
  const [clickedHelpful, setClickedHelpful] = useState(false);

  const handleClickHelpful = () => {
    if (clickedHelpful) {
      return;
    }

    axios.put(`/FEC/qa/answers/${props.entry.answer_id}/helpful`, null)
      .then((response) => { console.log('Success') })
      .then(() => { setCount(count + 1) })
      .then(() => { setClickedHelpful(true) })
      .catch((err) => console.log(err))
  }

  const handleClickReport = () => {

    setReported(true);

    axios.put(`/FEC/qa/answers/${props.entry.answer_id}/report`, null)
      .then((response) => { console.log('Success') })
      .catch((err) => console.log(err))
  }

  let user = props.entry.answerer_name;
  let answererName;
  if (user === 'seller' || user === 'Seller') {
    user = user.slice(0, 1).toUpperCase() + user.slice(1);
    answererName = <span style={{ fontWeight: 'bold' }}>{user}</span>
  } else {
    answererName = user;
  }


  return (
    <>
      <StyledAnswer>
        <div>
          Answer: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.entry.body}
        </div>
      </StyledAnswer>
        <div>
          <AddPhotos images={props.entry.photos} />
        </div>
      <StyledAnswerInfo>
        <div>
          by {answererName},&nbsp;{formattedDate(props.entry.date)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Helpful?&nbsp; <span onClick={handleClickHelpful}><u>Yes</u> ({props.entry.helpfulness})</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <span onClick={handleClickReport}>{!reported ? <u>Report</u> : <u>Reported</u>}</span>
        </div>
      </StyledAnswerInfo>
    </>

  );
}

export default Answer;