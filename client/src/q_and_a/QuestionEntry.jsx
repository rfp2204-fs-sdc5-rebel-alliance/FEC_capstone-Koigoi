import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {QuestionContext} from './QuestionList.jsx';
import config from '../../dist/config.js';

export const QuestionEntryContext = React.createContext();

const QuestionEntry = (props) => {

  // const questions = useContext(QuestionContext);
  const [answers, setAnswers] = useState([]);

  console.log('inside QuestionEntry answers =>:', answers)
  // setAnswers(response.data.results)
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.entry.question_id}/answers`;

  console.log('question id', props.entry.question_id)

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        question_id: props.entry.question_id,
        // page:
        // count:
      }
    })
      .then((response) => { console.log(response); setAnswers(response.data.results)  })
      .catch((err) => console.log(err))
  }, [url])
  // const searchWord = (word) => {

  // }
    return (
      <table>
        <tr>
          <td> {`Q: ${props.entry.question_body}`} </td>
        </tr>
        <tbody>
          {answers && answers.map((answer) =>
          <>
            <tr>
              <td>
              A: {answer.body}
              </td>
            </tr>
            <tr>
              <td>
              by {answer.answerer_name}, {answer.date} | Helpful? Yes {answer.helpfulness} | Report
              </td>
            </tr>
          </>
            )}
        </tbody>
      </table>
    );


}

export default QuestionEntry;