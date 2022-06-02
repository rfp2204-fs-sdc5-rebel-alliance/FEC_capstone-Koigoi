import React, { useState, useContext } from 'react';
import { ReviewsContext } from './RatingsAndReviews.jsx';

const SearchReviews = () => {
  const { search, setSearch, searchTerm, setSearchTerm } = useContext(ReviewsContext)

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm((event.target.value).toLowerCase())

    setSearch(true);
  }

  return (
    <div>
      <input
        type='text'
        placeholder={'Search reviews...'}
        value={searchTerm}
        onChange={handleChange}/>
    </div>
  )
}

export default SearchReviews;