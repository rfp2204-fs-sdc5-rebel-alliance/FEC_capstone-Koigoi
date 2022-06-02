import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ReviewListCard from './ReviewListCard.jsx';
import AddReviewForm from './AddReviewForm.jsx';

import { ProdPageContext } from '../product_page.jsx';
import { ReviewsContext } from './RatingsAndReviews.jsx';

const ReviewListContainer = styled.div`
  font-size: 18px;
  border: 1px solid ${(props) => props.theme.fontColor};
`;

const ReviewCardContainer = styled.div`
max-height: 600px;
max-width: 100%;
overflow: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  alignItems: center;
  padding: 20px 20px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.25rem 1rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  margin: 0 2rem 0 0;
  background: #FFF;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const AddButton = styled(Button)`
  background: black;
  color: white;
`;

function ReviewList({ removeFilters, renderFilterRatings }) {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([])
  const [filterRatingsCount, setFilterRatingsCount] = useState(10);
  const { prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent, totalRatings, setTotalRatings, setAverageRating } = useContext(ProdPageContext);
  const { apiCount, reviewCount, setReviewCount, sort, ratings, setRatings, numRating, setNumRating, filterNumRating, filtered, helpful, characteristics, characteristicLabels, showCharacteristicLabel, setShowCharacteristicLabel, setRecommended, search, searchTerm } = useContext(ReviewsContext);

  useEffect(() => {
    axios.get(`/reviews`, {
      params: {
        page: 1,
        count: apiCount,
        sort: sort,
        product_id: prod_id
      }
    })
    .then((reviews) => {
      setTotalRatings(reviews.data.results.length);
      ratingsMeta(reviews.data.results)

      if (searchTerm.length >= 3) {
        const query = reviews.data.results.filter((review) => {
          return review.body.toLowerCase().includes(searchTerm)
        });
        setAllReviews(query)
        filterNumRatings(query)
      } else {
        setAllReviews(reviews.data.results)
        filterNumRatings(reviews.data.results)
      }
    })
    .catch((err) => {console.log(err)})
  }, [prod_id, apiCount, sort, helpful, totalRatings, searchTerm, filtered]);

  useEffect(() => {
    if (filtered === true) {
      setReviews(filterNumRating.slice(0, filterRatingsCount))
    } else {
      setReviews(allReviews.slice(0, reviewCount))
    }
  }, [reviewCount, filterRatingsCount, allReviews, filtered, searchTerm])

  const getReviews = () => {
    if (filtered === true) {
      setFilterRatingsCount(prevReviewCount => prevReviewCount + 2)
    } else {
      setFilterRatingsCount(10);
      setReviewCount(prevReviewCount => prevReviewCount + 2);
    }
  }

  const ratingsMeta = (reviewsData) => {
    let numRatingObj = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }

    let recommended = {
      true: 0,
      false: 0
    }

    let averageRating = 0;

    reviewsData.forEach((review) => {
      numRatingObj[review.rating].push(review);
      recommended[review.recommend] += 1;
      averageRating += review.rating;
    })

    const ratingsCount = {
      1: numRatingObj[1].length,
      2: numRatingObj[2].length,
      3: numRatingObj[3].length,
      4: numRatingObj[4].length,
      5: numRatingObj[5].length
    }

    setAverageRating(Math.round((averageRating / totalRatings) * 10) / 10);
    setRatings(ratingsCount);
    setRecommended(recommended);
  }

  const filterNumRatings = (reviewsData) => {
    let numRatingObj = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }

    // let recommended = {
    //   true: 0,
    //   false: 0
    // }

    // let averageRating = 0;

    reviewsData.forEach((review) => {
      numRatingObj[review.rating].push(review);
      // recommended[review.recommend] += 1;
      // averageRating += review.rating;
    })

    // const ratingsCount = {
    //   1: numRatingObj[1].length,
    //   2: numRatingObj[2].length,
    //   3: numRatingObj[3].length,
    //   4: numRatingObj[4].length,
    //   5: numRatingObj[5].length
    // }

    // setAverageRating(Math.round((averageRating / totalRatings) * 10) / 10);
    setNumRating(numRatingObj);
    // setRatings(ratingsCount);
    // setRecommended(recommended);

  }

  let moreReviewsButton = null;
  let noReviewsGreeting = null;

   if (reviewCount >= totalRatings) {
    moreReviewsButton = null;
  } else if (reviewCount > 0) {
    moreReviewsButton = <Button onClick={() => {getReviews()}}>More Reviews</Button>;
  } else {
    noReviewsGreeting = <p>Be the first to review this product!</p>;
  }

  const handleModal = () => {
    setModalHeaderContent('Write Your Review')
    setModalBodyContent(<AddReviewForm prodId={prod_id} productName={prod_name} characteristics={characteristics} characteristicLabels={characteristicLabels} showCharacteristicLabel={showCharacteristicLabel} setShowCharacteristicLabel={setShowCharacteristicLabel} setShowModal={setShowModal}/>);
    setShowModal(true);
  }

  return (
    <ReviewListContainer>
      <ReviewCardContainer>
        {noReviewsGreeting}
        {reviews.map((review, index) =>
          <ReviewListCard
            key={index}
            index={index}
            id={review.review_id}
            date={review.date}
            rating={review.rating}
            reviewerName={review.reviewer_name}
            summary={review.summary}
            body={review.body}
            response={review.response}
            helpfulness={review.helpfulness}
            photos={review.photos}
            recommend={review.recommend}
          />
        )}
      </ReviewCardContainer>
      <ButtonContainer>
        {moreReviewsButton}
        <AddButton onClick={() => {handleModal()}}>Add a Review</AddButton>
      </ButtonContainer>
    </ReviewListContainer>
  );
}

export default ReviewList;