import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import formattedDate from '../shared_components/formattedDate.js'
// import styled from 'styled-components';

const Answer = (props) => {

  console.log('Answer: props =>:', props)
  return (
    <>
      <tr>
        <td>
          A: {props.entry.body}
        </td>
      </tr>
      <tr>
        <td>
          by {props.entry.answerer_name}, {formattedDate(props.entry.date)} | Helpful? Yes {props.entry.helpfulness} | Report
        </td>
      </tr>
    </>

  );
}

export default Answer;