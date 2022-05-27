import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import { QuestionContext } from  './QuestionList.jsx';
import formattedDate from '../shared_components/formattedDate.js'

const Answer = (props) => {

  const {count, setCount} = useContext(QuestionContext);

  const handleClickHelpful = () => {

    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${props.entry.answer_id}/helpful`, null, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((response) => {console.log('Success')})
    .then(() => {setCount(count + 1)})
    .catch((err) => console.log(err))

  }

  return (
    <>
      <div>
        A: {props.entry.body}
      </div>
      <div>
         by {props.entry.answerer_name}, {formattedDate(props.entry.date)} | Helpful? <span onClick={handleClickHelpful}><u>Yes</u> ({props.entry.helpfulness})</span> | <u>Report</u>
      </div>
    </>

  );
}

export default Answer;