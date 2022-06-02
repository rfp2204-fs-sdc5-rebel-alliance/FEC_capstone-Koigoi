import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionEntry from './QuestionEntry.jsx';
import { ProdPageContext } from '../product_page.jsx';
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
  const { prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent } = useContext(ProdPageContext);
  const [questionsToShow, setQuestionsToShow] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const [filtered, setFiltered] = useState(false);


  const title = 'Customer questions & answers';
  const url = `/qa/questions`;

  useEffect(() => {
    axios.get(url, {
      params: {
        product_id: prod_id,
        count: 34
      }
    })
      .then((response) => { setQuestions(response.data.results); })
      .catch((err) => console.log(err))
  }, [count, prod_id])


  const searchQuestions = (word) => {
    let search = word.toLowerCase();
    let result = questions.filter((item) => item.question_body.toLowerCase().includes(search))
    setFilteredQuestions(result);
    if (word.length > 1) {
      setFiltered(true);
    } else if (word.length <= 1) {
      setFiltered(false);
      setCount(count + 1);
      setExpanded(false);
      setQuestionsToShow(4);
      setShow(true);
    }
  }

  const handleModal = () => {
    setModalHeaderContent('Your Question')
    setModalBodyContent(<AddQuestionForm prodId={prod_id} prodName={prod_name} count={count} setCount={setCount} />);
    setShowModal(true);
  }

  const handleMoreQuestions = () => {
    if (questionsToShow < questionList.length) {
      setQuestionsToShow(questionsToShow + 2)
    } else {
      setShow(false)
    }
  }

  const questionList = filtered ? filteredQuestions : questions;

  let moreAnsweredQuestions;
  if (questionList.length > 4) {
    moreAnsweredQuestions = <button onClick={handleMoreQuestions}> MORE ANSWERED QUESTIONS </button>
  } else {
    moreAnsweredQuestions = null
  }


  return (
    <div>
      <h2 > {title} </h2> <br></br>
      <QuestionContext.Provider value={{ searchQuestions, count, setCount }}>
          <Search /> <br></br>
          <QuestionListContainer>
            {filtered && questionList.length === 0 && <p> No questions found. Please, clear the search field</p>}
            {!filtered && questionList.length === 0 && <p>No questions. Make a question about {prod_name}</p>}
            {questionList.slice(0, questionsToShow).map((item) => <QuestionEntry key={item.question_id} entry={item} />)}<br></br>
          </QuestionListContainer><br></br>
          {show ? moreAnsweredQuestions : null} &nbsp;&nbsp;&nbsp;
          <button onClick={handleModal}> ADD A QUESTION + </button><br></br>
        </QuestionContext.Provider>
    </div >
  );
}

export default QuestionList;