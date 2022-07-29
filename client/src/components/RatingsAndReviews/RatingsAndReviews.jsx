import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import FeaturesBox from './FeaturesBox.jsx';
import RatingsBox from './RatingsBox.jsx';

const Container = styled.div`
  display: flex;
  height: 1300px;
`
const RatingsContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  h4 {
    margin-bottom: 5px;
  }
`
const ReviewsContainer = styled.main`
  flex: 3;
  margin-left: 30px;
  padding-left: 24px;
  margin-top: 40px;
  h3 {
    margin-bottom: 0;
  }
`

export default function RatingsAndReviews(props) {
  let [reviews, setReviews] = useState(() => []);
  let [reviewTotal, setReviewTotal] = useState(0);
  let [reviewDisplayCount, setReviewDisplayCount] = useState(2);
  let [reviewMetadata, setReviewMetadata] = useState('');
  let [sortCategory, setSortCategory] = useState('relevant');
  let [hasLoaded, setHasLoaded] = useState(false);
  let [starsFilter, setStarsFilter] = useState([]);

  const getReviews = async () => {
    let res = await axios.get('/reviews/meta', { params: { product_id: props.productID } });
    await setReviewMetadata(res.data);
    let reviewCount = countReviews(res.data.ratings);
    await setReviewTotal(reviewCount);
    let res2 = await axios.get('/reviews', { params: { product_id: props.productID, count: reviewCount, sort: sortCategory } });
    let final = res2.data.results;
    return final;
  }

  useEffect (() => {
    pageLoader();
  }, [sortCategory, starsFilter]);

  const pageLoader = async () => {
    await setReviewDisplayCount(2);
    let loadedReviews = await getReviews();
    if (starsFilter.length > 0) {
      let filteredReviews = loadedReviews.filter( (review) => {
        return starsFilter.includes(String(review.rating))
      })
      await setReviews(filteredReviews)
      await setHasLoaded(true);
      return;
    }
    await setReviews(loadedReviews)
    await setHasLoaded(true);
  }

  const countReviews = (ratingsObj) => {
    let counter = 0;
    for (let key in ratingsObj) {
      if (Object.hasOwn(ratingsObj, key)) {
        counter += parseInt(ratingsObj[key]);
      }
    }
    return counter;
  }

  const getMoreReviews = () => {
    setReviewDisplayCount(reviewDisplayCount + 2);
  }

  const sortHandler = (event) => {
    setSortCategory(event.target.value);
  }

  return (
    <div className="ratings-and-reviews">
      {hasLoaded &&
        <Container ref={props.reference} id="ratings-reviews-container">
          <RatingsContainer id="ratings-container">
            <RatingsBox metadata={reviewMetadata} hasLoaded={hasLoaded} reviewTotal={reviewTotal} starsFilter={starsFilter} setStarsFilter={setStarsFilter} reviewAvg={props.reviewAvg} ></RatingsBox>
            <FeaturesBox metadata={reviewMetadata}></FeaturesBox>
          </RatingsContainer>
          <ReviewsContainer id="reviews-container">
            <ReviewsList id="reviews-container" reviews={reviews} reviewDisplayCount={reviewDisplayCount} reviewTotal={reviewTotal} productID={props.productID} sortCategory={sortCategory} sortHandler={sortHandler} getMoreReviews={getMoreReviews} starsFilter={starsFilter} metadata={reviewMetadata} />
          </ReviewsContainer>
        </Container>
      }
    </div>
  )
}