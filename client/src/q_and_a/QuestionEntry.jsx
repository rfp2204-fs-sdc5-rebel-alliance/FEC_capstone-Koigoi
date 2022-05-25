import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import { QuestionContext } from './QuestionList.jsx';
import config from '../../dist/config.js';
import Answer from './Answer.jsx';
import QnaModal from './QnaModal.jsx';
import styled from 'styled-components';
import { ProdPageContext } from '../product_page.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';
// export const QuestionEntryContext = React.createContext();


const QuestionEntry = (props) => {

  // const questions = useContext(QuestionContext);
  const { prod_id, showModal, setShowModal } = useContext(ProdPageContext);
  const [answers, setAnswers] = useState([]);
  const [answersToShow, setAnwsersToShow] = useState(2); // maping
  const [expanded, setExpanded] = useState(false); // button
  const [show, setShow] = useState(true);
  // const [showModal, setShowModal] = useState(false);

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

  // const showModalHandler = (e) => {
  //   // showModal ? setShowModal(false) : setShowModal(true);
  //   setShowModal(true);
  // }
  // const hideModalHandler = (e) => {
  //   setShowModal(false);
  // }

  const handleModel = () => {
    setShowModal(true);
  }

  const loadMoreAnswers =() => {
    answers.length === 0 ? setShow(false) : setShow(true)
    answersToShow === 2 ? setAnwsersToShow(answers.length) : setAnwsersToShow(2);
    setExpanded(!expanded)
  }

  return (
    <table>
      <thead>
        <tr>
          <td> {`Q: ${props.entry.question_body}`} Helpful? Yes {props.entry.question_helpfulness} |
          <a onClick={handleModel}> Add Answer </a>
          <QnaModal headerTitle={'Answer'} body={<AddAnswerForm/>}/>
          </td>
        </tr>
      </thead>
      <tbody>
            {answers.slice(0, answersToShow).map((answer) => <Answer key={answer.answer_id} entry={answer}/>)}
        <tr>
           {show ? (<a onClick={loadMoreAnswers}> {!expanded ? (<td>Load More Answers </td>) : (<td>Collapse answers</td>)}</a>) : null}
        </tr>
      </tbody>
    </table>
  );


}

export default QuestionEntry;