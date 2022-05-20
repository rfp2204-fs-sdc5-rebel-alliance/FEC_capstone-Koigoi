import React, {useState, useContext, createContext} from 'react';
import axios from 'axios';
import {ProdPageContext} from '../product_page.jsx';
import RelatedProductCard from './RelatedProductCard.jsx';

export const RelatedItemsContext = createContext();

const RelatedItems = () => {
  const {prod_id} = useContext(ProdPageContext);

  return (
    <div>
      <h2>
        This is Hansol's Related Items section!
      </h2>
      <RelatedItemsContext.Provider value={{}}>
        <RelatedProductCard />
      </RelatedItemsContext.Provider>
    </div>
  )
}

export default RelatedItems;