import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import { QuestionContext } from './QuestionList.jsx';
import styled from 'styled-components';

const Search = () => {

  const {searchQuestions} = useContext(QuestionContext);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // searchQuestions(search);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    searchQuestions(search);
  }
  return (
    <div>
      <input
        icon='search'
        type="text"
        // className="input"
        placeholder="Have a question? Search for answers…"
        value={search}
        onChange={handleSearchChange}
      />
      <button type="submit" onClick={handleSearch} >Search</button>
    </div>
  );
}

export default Search;