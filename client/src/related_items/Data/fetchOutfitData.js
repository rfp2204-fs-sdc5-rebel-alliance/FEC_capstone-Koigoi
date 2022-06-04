import { fetchRelatedData, fetchRatingsData } from './fetchRelatedData.js';
import sharedReviewsComponent from '../../shared_components/sharedReviewsComponent';

const fetchOutfitDetails = (id) => {
  const promiseArray = [];
  promiseArray.push(fetchRelatedData('styles', id));
  promiseArray.push(fetchRelatedData('', id));
  promiseArray.push(fetchRatingsData('meta', id));
  return Promise.all(promiseArray)
    .then(([productStyles, productInfo, productRatings]) => {
      const avgRating = sharedReviewsComponent(productRatings.ratings);
      const outfit = {
        id,
        category: productInfo.category,
        name: productInfo.name,
        rating: avgRating.avgRating
      };
      const eachStyle = productStyles.results;
      let isDefaultTrue = false;
      eachStyle.forEach((style) => {
        if (style['default?']) {
          isDefaultTrue = true;
          outfit.price = style.original_price;
          outfit.salesPrice = style.sale_price;
          outfit.image = style.photos[0].thumbnail_url;
        }
      });
      if (!isDefaultTrue) {
        outfit.price = eachStyle[0].original_price;
        outfit.salesPrice = eachStyle[0].sale_price;
        outfit.image = eachStyle[0].photos[0].thumbnail_url;
      }
      return outfit;
    })
    .then((data) => { return data })
    .catch((err) => console.log(err));
};

export default fetchOutfitDetails;