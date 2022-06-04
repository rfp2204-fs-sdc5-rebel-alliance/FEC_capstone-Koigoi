import React from 'react';
import axios from 'axios';

export const fetchRelatedData = (typeOfData, id) => {
  return axios.get(`/FEC/products/${id}/${typeOfData}`)
    .then((response) => { return response.data })
    .catch((err) => console.log(err));
};

export const fetchRatingsData = (typeOfData, id) => {
  return axios.get(`/reviews/${typeOfData}?product_id=${id}`)
    .then((response) => { return response.data })
    .catch((err) => console.log(err));
};