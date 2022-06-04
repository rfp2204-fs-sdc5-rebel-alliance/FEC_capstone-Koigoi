import React from 'react';

export const findDuplicates = (productDetails) => {
  const noDuplicates = [...new Map(productDetails.map(product => [product.id, product])).values()];
  return noDuplicates;
};