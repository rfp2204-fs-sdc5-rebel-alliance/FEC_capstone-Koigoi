import { fetchRelatedData, fetchRatingsData } from './fetchRelatedData.js';
import sharedReviewsComponent from '../../shared_components/sharedReviewsComponent';

const fetchOutfitDetails = (id) => {
  const promiseArray = [];
  promiseArray.push(fetchRelatedData('styles', id));
  promiseArray.push(fetchRelatedData('', id));
  promiseArray.push(fetchRatingsData('meta', id));
  return Promise.all(promiseArray)
  .then(([productStyles, productInfo, productRatings]) => {
    const defaultImage = [];
    const price = [];
    const salePrice = [];
    const eachStyle = productStyles.results;
    let isDefaultTrue = false;
    eachStyle.forEach((style) => {
      if (style['default?']) {
        isDefaultTrue = true;
        price.push(style.original_price);
        salePrice.push(style.sale_price);
        defaultImage.push(style.photos[0].thumbnail_url);
      }
    });
    if (!isDefaultTrue) {
      price.push(eachStyle[0].original_price);
      salePrice.push(eachStyle[0].sale_price);
      defaultImage.push(eachStyle[0].photos[0].thumbnail_url);
    }
    const avgRating = sharedReviewsComponent(productRatings.ratings);
    const outfit = {
      id: id,
      image: defaultImage[0],
      category: productInfo.category,
      name: productInfo.name,
      price: price[0],
      salesPrice: salePrice[0],
      rating: avgRating.avgRating
    }
    return outfit;
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.log(err));
}

export default fetchOutfitDetails;