import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RatingsBar from './RatingsBar.jsx';
import AverageStars from '../AverageStars.jsx';

const RatingsBarContainer = styled.div`
  margin: 0px 0;
  width: 100%;
  font-size: 12px
`
const RecommendedContainer = styled.div`
  margin-bottom: 5px;
  margin-top: 14px;
  font-size: 14px;
`
const RatingsBarList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 8px;
  & li {
    box-sizing: border-box;
    display: flex;
    padding: 4px 0;
    align-items: center;
    border-radius: 3px;
    gap: 0px;
  }

  & li:hover {
    background-color: orange;
  }
`
const SectionHeading = styled.h2`
  margin-top: 0;
`
const AvgRatingAndStars = styled.div`
  span:first-child {
    font-size: 60px;
    font-weight: 800;
    margin-right: 10px;
  }
  span svg {
    height: 17px;
    width: 17px;
  }

  span:nth-child(2) {
    position: relative;
    bottom: 14px;
  }
`
const RatingsBreakdown = styled.div`
  h4 {
    margin-top: 18px
  }
`
export default function RatingsBox(props) {

  let [recommendedPercent, setRecommendedPercent] = useState(0);

  useEffect(() => {
    setRecommendedPercent(calculateRecommended(props.metadata.recommended))
  }, []);

  const calculateRecommended = (obj) => {
    let sumReviews = 0;
    let numberOfRecommends;
    for (let key in obj) {
      if (Object.hasOwn(obj, key)) {
        if (key === 'false') {
          sumReviews += parseInt(obj[key]);
        }
        if (key === 'true') {
          sumReviews += parseInt(obj[key]);
          numberOfRecommends = parseInt(obj[key]);
        }
      }
    }
    let result = (numberOfRecommends / sumReviews).toFixed(2) * 100;
    return String(result);
  }

  const createRatingsBreakdown = (ratingsObj) => {
    let sortedKeys = Object.keys(ratingsObj).sort((a, b) => b - a);
    return sortedKeys.map((key) => {
      let ratingsPercent = Math.round((parseInt(ratingsObj[key]) / props.reviewTotal) * 100);
      let ratingsPercentRemainder = 100 - ratingsPercent;
      return (<RatingsBar key={key} starValue={key} ratingsPercent={ratingsPercent} ratingsPercentRemainder={ratingsPercentRemainder} starsFilter={props.starsFilter} setStarsFilter={props.setStarsFilter} ></RatingsBar>
      )
    })
  }

  const clickHandler = (e) => {
    e.preventDefault();
    props.setStarsFilter([]);
  }

  return (
    <>
      <SectionHeading>RATINGS & REVIEWS</SectionHeading>
      <AvgRatingAndStars>
        <span>{String(props.reviewAvg).slice(0, -1)}</span>
        <span><AverageStars rating={props.reviewAvg}/></span>
      </AvgRatingAndStars>
      <RecommendedContainer>
        {recommendedPercent}% of reviews recommend this product
      </RecommendedContainer>
      <RatingsBreakdown>
        <h4>RATINGS BREAKDOWN</h4>
      </RatingsBreakdown>
      <RatingsBarContainer>
        <RatingsBarList>
          {props.hasLoaded && createRatingsBreakdown(props.metadata.ratings)}
        </RatingsBarList>
        {props.starsFilter.length > 0
          ? (<div>Filters are enabled (<a href="#" onClick={clickHandler}>remove all</a>)</div>
          )
          : null
        }
      </RatingsBarContainer>
    </>
  )
}