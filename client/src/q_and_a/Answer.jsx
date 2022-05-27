import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import formattedDate from '../shared_components/formattedDate.js'

const Answer = (props) => {

  return (
    <>
      <div>
        A: {props.entry.body}
      </div>
      <div>
         by {props.entry.answerer_name}, {formattedDate(props.entry.date)} | Helpful? Yes {props.entry.helpfulness} | Report
      </div>
    </>

  );
}

export default Answer;