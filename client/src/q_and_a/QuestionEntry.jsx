import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import { ProdPageContext } from '../product_page.jsx';
import { QuestionContext } from  './QuestionList.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';
import styled from 'styled-components';

const StyledQuestion = styled.div`
  display: flex;
  font-weight: bold;
  color: #2F8F9D;
  justify-content: space-between;
  margin-top: 6px;
  margin-left: 20px;
  margin-bottom: 6px;
`;

const StyledQuestionBody = styled.span`
  margin-left: 20px;
`;

const StyledQuestionInfo = styled.div`
  text-align: right;
  font-size: 12px;
  margin-right: 40px;
`;
const StyledLoadMoreAnswer = styled.a`
  font-size: 12px;
  font-weight: bold;
  margin-left: 116px;
  margin-bottom: 20px;
`;

const QuestionEntry = (props) => {

  const { prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);
  const {count, setCount} = useContext(QuestionContext);
  const [answers, setAnswers] = useState([]);
  const [sellerTopAnswers, setSellerTopAnswers] = useState(answers);
  const [existSeller, setExistSeller] = useState(false);
  const [answersToShow, setAnwsersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(true);
  const [clickedHelpful, setClickedHelpful] = useState(false);

  const url = `/FEC/qa/questions/${props.entry.question_id}/answers`;

  useEffect(() => {
    axios.get(url)
      .then((response) => { setAnswers(response.data.results); })
      .catch((err) => console.log(err))
  }, [count])

  const handleClickHelpful = () => {
    if (clickedHelpful) {
      return;
    }

    axios.put(`/FEC/qa/questions/${props.entry.question_id}/helpful`, null)
    .then((response) => {console.log('Success')})
    .then(() => {setCount(count + 1)})
    .then(() => {setClickedHelpful(true)})
    .catch((err) => console.log(err))

  }

  // handle seller Answers
  const isSeller = (obj) => obj.answerer_name.toLowerCase() === 'seller';
  const isUser = (obj) => obj.answerer_name.toLowerCase() !== 'seller';
  let sellerArray = answers.filter(isSeller);
  let userArray = answers.filter(isUser);
  let newAnswers = [...sellerArray, ...userArray];

  useEffect(() => {
    if(sellerArray.length > 0) {
      setExistSeller(true);
      setSellerTopAnswers(newAnswers);
    } else {
      setExistSeller(false);
    }
  }, [answers])

  const handleModal = () => {
    setModalHeaderContent('Submit Your Answer')
    setModalBodyContent(<AddAnswerForm prodName={prod_name} questionBody={props.entry.question_body} questionId={props.entry.question_id} count={count} setCount={setCount}/>);
    setShowModal(true);
  }

  const loadMoreAnswers = () => {
    answersToShow === 2 ? setAnwsersToShow(answers.length) : setAnwsersToShow(2);
    setExpanded(!expanded)
  }

  let loadMoreAnswersLink = null;

  if (answers.length > 2) {
    loadMoreAnswersLink = <StyledLoadMoreAnswer onClick={loadMoreAnswers}>{!expanded ? 'Load More Answers' : 'Collapse answers'}</StyledLoadMoreAnswer>
  } else {
    loadMoreAnswersLink = null
  }

  const answerList = existSeller ? sellerTopAnswers : answers;

  return (
    <div>
      <div>
        <StyledQuestion>
          <div>
            <span>Question:</span>
            <StyledQuestionBody>
            <span>{props.entry.question_body}</span>
            </StyledQuestionBody>
          </div>
        <StyledQuestionInfo>
          <div>
            Helpful?&nbsp;<span onClick={handleClickHelpful}><u>Yes</u> ({props.entry.question_helpfulness})</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<u onClick={handleModal}>Add Answer</u>
          </div>
        </StyledQuestionInfo>
        </StyledQuestion>
      </div>
      <div>
        <div>
        {answerList.slice(0, answersToShow).map((answer) => <Answer key={answer.answer_id} entry={answer} />)}
        </div>
        <div>
          {loadMoreAnswersLink }
        </div>
      </div>
    </div>
  );


}

export default QuestionEntry;