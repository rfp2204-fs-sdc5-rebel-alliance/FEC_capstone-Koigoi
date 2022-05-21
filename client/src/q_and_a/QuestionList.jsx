import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionEntry from './QuestionEntry.jsx';
import { ProdPageContext } from '../product_page.jsx';
import config from '../../dist/config.js';

export const QuestionContext = React.createContext();

const QuestionList = () => {

  const [questions, setQuestions] = useState([]);
  const { prod_id } = useContext(ProdPageContext);
  // const { que_id } = useContext(AnswerContext)

  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: config.TOKEN
      },
      params: {
        product_id: prod_id,
        // page: 2,
        // count: 5
      }
    })
      .then((response) => { console.log(response); setQuestions(response.data.results) })
      .catch((err) => console.log(err))
  }, [url])
  const title = 'QUESTIONS & ANSWERS';
  const searchWord = (word) => {
    console.log(word)
  }

  return (
    <div>
      <p > {title} </p>
      <QuestionContext.Provider value={{questions, searchWord}}>
          <Search />
          {questions.map((item) => <QuestionEntry key={item.question_id} entry={item} />)}
      </QuestionContext.Provider>
    </div>
  );
}

export default QuestionList;