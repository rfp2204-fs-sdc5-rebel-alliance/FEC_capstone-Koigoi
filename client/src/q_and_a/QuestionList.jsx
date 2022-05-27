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
  // const [filteredQuestion, setFilteredQuestion] = useState([])
  const { prod_id, prod_name, setShowModal, setModalBodyContent,setModalHeaderContent} = useContext(ProdPageContext);
  const [questionsToShow, setQuestionsToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(true);



  const title = 'QUESTIONS & ANSWERS';
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        product_id: 40352
      }
    })
      .then((response) => { setQuestions(response.data.results); })
      .catch((err) => console.log(err))
  }, [url])


  const searchQuestions = (word) => {
    let search = word.toLowerCase();
    let result;
    if (word.length > 2) {
      result = questions.filter((item) => item.question_body.includes(search))
      setQuestions(result);
    } else if (word.length <=1) {
      axios.get(url, {
        headers: {
          Authorization: config.TOKEN
        },
        params: {
          product_id: 40352
        }
      })
        .then((response) => { setQuestions(response.data.results) })
        .catch((err) => console.log(err))
      setExpanded(false);
      setQuestionsToShow(2);
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
    setModalBodyContent(<AddQuestionForm prodId={prod_id} prodName={prod_name}/>);
    setShowModal(true);
  }
  return (
    <div>
      <p > {title} </p>
      <QuestionContext.Provider value={{searchQuestions }}>
        <Search />
        <QuestionListContainer>
          {questions.slice(0, questionsToShow).map((item) => <QuestionEntry key={item.question_id} entry={item} />)}
        </QuestionListContainer>
        {show ? <button onClick={loadMoreQuestions}> MORE ANSWERED QUESTIONS </button> : null}
        <button onClick={handleModal}> ADD A QUESTION + </button>
      </QuestionContext.Provider>
    </div>
  );
}

export default QuestionList;