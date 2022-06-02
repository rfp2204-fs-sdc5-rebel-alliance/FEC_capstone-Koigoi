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
    console.log(outfit);
    return outfit;
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.log(err));
}

export default fetchOutfitDetails;