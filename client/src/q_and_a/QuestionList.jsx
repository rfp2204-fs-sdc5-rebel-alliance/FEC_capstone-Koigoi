import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionEntry from './QuestionEntry.jsx';
import { ProdPageContext } from '../product_page.jsx';
import config from '../../dist/config.js';
// import styled from 'styled-components';

export const QuestionContext = React.createContext();

const QuestionList = () => {

  const [questions, setQuestions] = useState([]);
  const { prod_id } = useContext(ProdPageContext);
  const [questionsToShow, setQuestionsToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(limit); // for limiting question
  const [show, setShow] = useState(true);
  const limit = 6; // for limitin guestion
  // const { que_id } = useContext(AnswerContext)

  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        product_id: 40349,
        // page: 2,
        // count: 5
      }
    })
      .then((response) => { console.log('This is response of get:', response); setQuestions(response.data.results) })
      .catch((err) => console.log(err))
  }, [url])

  const title = 'QUESTIONS & ANSWERS';

  const searchQuestions = (word) => {
    let search = word.toLowerCase();
    let result;
    console.log('serchQuestions =>', word)
    if (word.length > 2) {
      result = questions.filter((item) => item.question_body.includes(search))
      setQuestions(result);
      console.log('search Fn: result:', result)
    } else {
      axios.get(url, {
        headers: {
          Authorization: config.TOKEN
        },
        params: {
          product_id: 40349,
          // page: 2,
          // count: 5
        }
      })
        .then((response) => { console.log('This is response of get:', response); setQuestions(response.data.results) })
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

  const addQuestion = () => {

  }

  return (
    <div>
      <p > {title} </p>
      <QuestionContext.Provider value={{ questions, searchQuestions }}>
        <Search />
        {questions.slice(0, questionsToShow).map((item) => <QuestionEntry key={item.question_id} entry={item} />)}
        {show ? <button onClick={loadMoreQuestions}> MORE ANSWERED QUESTIONS </button>  : null}
        <button onClick={addQuestion}> ADD A QUESTION + </button>
      </QuestionContext.Provider>
    </div>
  );
}

export default QuestionList;