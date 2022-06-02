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

const Button = styled.button`
  justify-content: center;
  padding: 0.25rem 1rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  margin: 0 2rem 0 0;
  background: #FFF;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const AddButton = styled(Button)`
  background: black;
  color: white;
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


  const title = 'CUSTOMER QUESTIONS & ANSWERS';
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
    moreAnsweredQuestions = <Button onClick={handleMoreQuestions}> More Answered Questions </Button>
  } else {
    moreAnsweredQuestions = null
  }


  return (
    <div>
      <h2 > {title} </h2>
      <QuestionContext.Provider value={{ searchQuestions, count, setCount }}>
          <Search />
          <QuestionListContainer>
            {filtered && questionList.length === 0 && <p> No questions found. Please, clear the search field</p>}
            {!filtered && questionList.length === 0 && <p>No questions. Make a question about {prod_name}</p>}
            {questionList.slice(0, questionsToShow).map((item) => <QuestionEntry key={item.question_id} entry={item} />)}
          </QuestionListContainer>
          {show ? moreAnsweredQuestions : null}
          <AddButton onClick={handleModal}> Add a Question + </AddButton>
        </QuestionContext.Provider>
    </div >
  );
}

export default QuestionList;