function sharedReviewsComponent (ratings) {
  let ratingsObj = {
    totalRatings: 0,
    avgRating: 0,
  };

  Object.keys(ratings).forEach((value) => {
    ratingsObj.totalRatings += Number(ratings[value]);
    ratingsObj.avgRating += (ratings[value] * value);
  })

  ratingsObj.avgRating = Math.round((ratingsObj.avgRating / ratingsObj.totalRatings) * 10) / 10;

  return ratingsObj;
}

export default sharedReviewsComponent;