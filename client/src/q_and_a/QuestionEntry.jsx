import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import Answer from './Answer.jsx';
import { ProdPageContext } from '../product_page.jsx';
import { QuestionContext } from  './QuestionList.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';

const QuestionEntry = (props) => {

  const { prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);
  const {count, setCount} = useContext(QuestionContext);
  const [answers, setAnswers] = useState([]);
  const [answersToShow, setAnwsersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(true);

<<<<<<< HEAD
  // console.log('inside QuestionEntry answers =>:', answers)
=======
>>>>>>> main
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.entry.question_id}/answers`;

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        question_id: props.entry.question_id
      }
    })
      .then((response) => { setAnswers(response.data.results); })
      .catch((err) => console.log(err))
  }, [count])

  const handleClickHelpful = () => {

    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.entry.question_id}/helpful`, null, {
      headers: {
        Authorization: config.TOKEN
      }
    })
    .then((response) => {console.log('Success')})
    .then(() => {setCount(count + 1)})
    .catch((err) => console.log(err))

  }

  const handleModal = () => {
    setModalHeaderContent('Submit Your Answer')
    setModalBodyContent(<AddAnswerForm prodName={prod_name} questionBody={props.entry.question_body} questionId={props.entry.question_id} count={count} setCount={setCount}/>);
    setShowModal(true);
  }

  const loadMoreAnswers = () => {
    answers.length === 0 ? setShow(false) : setShow(true)
    answersToShow === 2 ? setAnwsersToShow(answers.length) : setAnwsersToShow(2);
    setExpanded(!expanded)
  }

  return (
    <>
      <div>
        <div>
        {`Q: ${props.entry.question_body}`} Helpful? <span onClick={handleClickHelpful}>Yes ({props.entry.question_helpfulness})</span> | <u onClick={handleModal} >    Add Answer</u>
        </div>
      </div>
      <div>
        <div>
        {answers.slice(0, answersToShow).map((answer) => <Answer key={answer.answer_id} entry={answer} />)}
        </div>
        <div>
          {show ? (<a onClick={loadMoreAnswers}> {!expanded ? 'Load More Answers' : 'Collapse answers'}</a>) : null}
        </div>
      </div>
    </>
  );


}

export default QuestionEntry;