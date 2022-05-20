import React, {useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';
// import {RelatedItemsContext} from './RelatedItems.jsx';
import {ProdPageContext} from '../product_page.jsx';
import config from '../../dist/config.js';

const RelatedProductCard = () => {
  const {prod_id} = useContext(ProdPageContext);
  const [related_ids, setRelated_ids] = useState([]);
  const [prod_image, setProd_image] = useState('');

  const fetchData = (typeOfData, id) => {
    let headers = {
      headers: {Authorization: config.TOKEN}
    };
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/${typeOfData}`, headers)
      .then((response) => {return response.data})
      .catch((err) => {alert('error fetching data')});
  }

  useEffect(() => {
    console.log('Component Mounted');
    fetchData('related', prod_id)
      .then((relatedData) => {
        // console.log('data results', relatedData);
        setRelated_ids(relatedData);
        return fetchData('styles', relatedData[1]);  // need to loop through all relatedData, not just one
      })
      .then((productData) => {
        for (let i = 0; i < productData.results.length; i++) {
          let current = productData.results[i];
          if (current['default?'] === true) {
            setProd_image(current.photos[0].url); // grab the first url
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [prod_id]);

  useEffect(() => {
    fetchData('related', related_ids[1])
      .then((productData) => {console.log('related data 1', productData)})
  }, [prod_id])

  return (
    <div>
      <p>
        This is a Related Product Card for product id: {prod_id}
        <img
          src={prod_image}
          alt='Girl in black shoes'
          width='250'
          height='300'
        />
      </p>

    </div>
  )
}



export default RelatedProductCard;
