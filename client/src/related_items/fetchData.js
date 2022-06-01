import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ProdPageContext } from '../product_page.jsx';

export const fetchData = (typeOfData, id) => {
    return axios.get(`/FEC/products/${id}/${typeOfData}`)
      .then((response) => {return response.data})
      .catch((err) => {console.log(err)});
}

export const fetchRatingsData = (typeOfData, id) => {
  return axios.get(`/reviews/${typeOfData}?product_id=${id}`)
    .then((response) => {return response.data})
    .catch((err) => {console.log(err)});
}