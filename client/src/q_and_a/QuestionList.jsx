import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionEntry from './QuestionEntry.jsx';
import { ProdPageContext } from '../product_page.jsx';
import config from '../../dist/config.js';
import styled from 'styled-components';
import AddQuestionForm from './AddQuestionForm.jsx';

export const QuestionContext = React.createContext();

const QuestionListContainer = styled.div`
max-height: 500px;
overflow: scroll;
`;

const QuestionList = () => {

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const { prod_id, prod_name, setShowModal, setModalBodyContent,setModalHeaderContent} = useContext(ProdPageContext);
  const [questionsToShow, setQuestionsToShow] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const [filtered, setFiltered] = useState(false);


  const title = 'QUESTIONS & ANSWERS';
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        product_id: prod_id,
        count: 34
      }
    })
      .then((response) => { setQuestions(response.data.results); })
      .catch((err) => console.log(err))
  }, [count])


  const searchQuestions = (word) => {
    let search = word.toLowerCase();
    let result = questions.filter((item) => item.question_body.toLowerCase().includes(search))
    setFilteredQuestions(result);
    if (word.length > 1) {
      setFiltered(true);
    } else if (word.length <=1) {
      setFiltered(false);
      setCount(count + 1);
      setExpanded(false);
      setQuestionsToShow(4);
      setShow(true);
    }
  }

  const loadMoreQuestions = () => {
    if (questionsToShow < questions.length) {
      setQuestionsToShow(questionsToShow + 2)
    } else {
      setShow(false);
    }
  }


  const handleModal = () => {
    setModalHeaderContent('Your Question')
    setModalBodyContent(<AddQuestionForm prodId={prod_id} prodName={prod_name} count={count} setCount={setCount}/>);
    setShowModal(true);
  }

  const questionList = filtered ? filteredQuestions : questions;

  return (
    <div>
      <p > {title} </p>
      <QuestionContext.Provider value={{searchQuestions, count, setCount }}>
        <Search />
        <QuestionListContainer>
          {filtered && questionList.length === 0 && <p> No questions found. Please, clear the search field</p> }
          {questionList.slice(0, questionsToShow).map((item) => <QuestionEntry key={item.question_id} entry={item} />)}
        </QuestionListContainer>
        {show ? <button onClick={loadMoreQuestions}> MORE ANSWERED QUESTIONS </button> : null} &nbsp;&nbsp;&nbsp;
        <button onClick={handleModal}> ADD A QUESTION + </button>
      </QuestionContext.Provider>
    </div>
  );
}

export default QuestionList;