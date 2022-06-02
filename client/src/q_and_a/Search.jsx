import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import { QuestionContext } from './QuestionList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  align-items: center;
  width: 800px;
  border: solid;
  border-color: #36393E;
  // outline: 0.1rem;

`;
const SearchInput = styled.input`
  margin: 0 0.5rem 0 0.5rem;
  border: none;
  outline: none;
  background: #FFFAFA;
`;

const Search = () => {

  const { searchQuestions } = useContext(QuestionContext);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    searchQuestions(search);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    searchQuestions(search);
  }
  return (
    <SearchContainer>
      <div>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
        <SearchInput
          // icon='search'
          type="text"
          placeholder="Have a question? Search for answers…"
          value={search}
          size="80"
          onChange={handleSearchChange}
        />

        {/* <button type="submit" onClick={handleSearch} >Search</button> */}
      </div>
    </SearchContainer>
  );
}

export default Search;