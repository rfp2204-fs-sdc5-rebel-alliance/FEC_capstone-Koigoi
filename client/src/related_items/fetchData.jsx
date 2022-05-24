import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {ProdPageContext} from '../product_page.jsx';
import config from '../../dist/config.js';

// move this to server
const fetchData = (typeOfData, id) => {
    let headers = {
      headers: {Authorization: config.TOKEN}
    };
    let API = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

    return axios.get(`${API}/products/${id}/${typeOfData}`, headers)
      .then((response) => {return response.data})
      .catch((err) => {console.log(err)});
}

export default fetchData;