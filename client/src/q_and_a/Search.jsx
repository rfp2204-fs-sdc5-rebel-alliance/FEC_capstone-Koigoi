import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import { QuestionContext } from './QuestionList.jsx';

const Search = () => {

  const {questions, searchWord} = useContext(QuestionContext);
  const [search, setSearch] = useState("");
  console.log('inside Search: questions =>:', questions)

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  // const handleSearch = () => {
  //   e.preventDefault();
  //   searchWord(search);
  // }
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
      <button type="submit" onClick={searchWord(search)} >Search</button>
    </div>
  );
}
// questions ? questions.forEach(item => console.log(item)) : null}
export default Search;