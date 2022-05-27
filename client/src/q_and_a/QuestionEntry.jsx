import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../../dist/config.js';
import Answer from './Answer.jsx';
import { ProdPageContext } from '../product_page.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';

const QuestionEntry = (props) => {

  const { prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);
  const [answers, setAnswers] = useState([]);
  const [answersToShow, setAnwsersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(true);

  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.entry.question_id}/answers`;
  const question_body = props.entry.question_body;

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        question_id: props.entry.question_id
      }
    })
      .then((response) => { setAnswers(response.data.results) })
      .catch((err) => console.log(err))
  }, [url])

  const handleModal = () => {
    setModalHeaderContent('Submit your Answer')
    setModalBodyContent(<AddAnswerForm prodName={prod_name} questionBody={question_body} />);
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
        {`Q: ${props.entry.question_body}`} Helpful? Yes {props.entry.question_helpfulness} |
        <a onClick={handleModal}> Add Answer </a>
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