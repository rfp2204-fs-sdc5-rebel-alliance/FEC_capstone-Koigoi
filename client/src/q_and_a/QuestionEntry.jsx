import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { QuestionContext } from './QuestionList.jsx';
import config from '../../dist/config.js';
import Answer from './Answer.jsx';
// import styled from 'styled-components';

export const QuestionEntryContext = React.createContext();


const QuestionEntry = (props) => {

  // const questions = useContext(QuestionContext);
  const [answers, setAnswers] = useState([]);
  const [answersToShow, setAnwsersToShow] = useState(2); // maping
  const [expanded, setExpanded] = useState(false); // button

  console.log('inside QuestionEntry answers =>:', answers)
  // setAnswers(response.data.results)
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.entry.question_id}/answers`;
  console.log('props.entry', props.entry)
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
      .then((response) => { console.log('get answer response:=>', response); setAnswers(response.data.results) })
      .catch((err) => console.log(err))
  }, [url])
  // const searchWord = (word) => {

  // }

  const loadMore =() => {

    answersToShow === 2 ? setAnwsersToShow(answers.length) : setAnwsersToShow(2);
    setExpanded(!expanded)
  }

  return (
    <table>
      <thead>
        <tr>
          <td> {`Q: ${props.entry.question_body}`} Helpful? Yes {props.entry.question_helpfulness} | Add Answer</td>
        </tr>
      </thead>
      <tbody>
            {answers.slice(0, answersToShow).map((answer) => <Answer key={answer.answer_id} entry={answer}/>)}
        <tr>
            <a onClick={loadMore}> {!expanded ? (<td>Load More Answers </td>) : (<td>Collapse answers</td>)}</a>
        </tr>
      </tbody>
    </table>
  );


}

export default QuestionEntry;