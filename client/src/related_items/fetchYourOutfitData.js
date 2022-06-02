import { fetchData, fetchRatingsData } from './fetchData.js';
import sharedReviewsComponent from '../shared_components/sharedReviewsComponent';

const getOutfitDetails = (id) => {
  const promiseArray = [];
  promiseArray.push(fetchData('styles', id));
  promiseArray.push(fetchData('', id));
  promiseArray.push(fetchRatingsData('meta', id));
  return Promise.all(promiseArray)
  .then(([productStyles, productInfo, productRatings]) => {
    const defaultImage = [];
    const eachStyle = productStyles.results;
    let isDefaultTrue = false;
    eachStyle.forEach((style) => {
      if (style['default?']) {
        isDefaultTrue = true;
        defaultImage.push(style.photos[0].thumbnail_url);
      }
    });
    if (!isDefaultTrue) {
      defaultImage.push(eachStyle[0].photos[0].thumbnail_url);
    }
    const avgRating = sharedReviewsComponent(productRatings.ratings);
    const outfit = {
      id: id,
      image: defaultImage[0],
      category: productInfo.category,
      name: productInfo.name,
      price: productInfo.default_price,
      rating: avgRating.avgRating
    }
    return outfit;
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.log(err));
}

export default getOutfitDetails;