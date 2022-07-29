import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx'
import AddReviewModal from './AddReviewModal.jsx'


const MoreReviewsButton = styled.button`
  border: 1px solid;
  margin: 5px;
`
const AddReviewButton = styled.button`
  display: inline-block;
  border: 1px solid;
  margin: 5px;
`
const ButtonContainer = styled.div`
  display: inline-flex;

  button {
  padding: 18px 21px;
  box-sizing: border-box;
  border: 1px solid black;
  margin-right: 12px;
  background: none;
  font: inherit;
  font-weight: bold;
  }
`
const SortBar = styled.form`
  margin-top: 5px;
  select {
    font-size: 1em;
    border: none;
    text-decoration: underline;
  }
`
const UnorderedList = styled.ul`
  padding: 0;
  max-height: 1000px;
  overflow: auto;
  &> li + li {
    border-top: 1px solid black;
  }
  & li:first-child div:first-child {
  }
  font-size: 15px;
  margin-top: 0;

`

export default function ReviewsList(props) {

  let [showReviewModal, setShowReviewModal] = useState(false);
  let [productName, setProductName] = useState('');

  useEffect( () => {
    axios.get(`/products/${props.productID}`)
      .then( (response) => {
        setProductName(response.data.name);
      })
  }, [])

  const listReviewTiles = props.reviews.map((review, index) => {
    if (index < props.reviewDisplayCount && props.starsFilter.indexOf(String(review.rating)) !== -1) {
      return <li key={review.review_id}><ReviewTile review={review} /></li>
    }
    if (index < props.reviewDisplayCount && props.starsFilter.length === 0) {
      return <li key={review.review_id}><ReviewTile review={review} /></li>
    }
  });

  const addReviewClickHandler = () => {
    setShowReviewModal(!showReviewModal);
  }

  return (
    <>
      <h3>
        <SortBar>
          <label>{props.reviewTotal} reviews, sorted by </label>
          <select id="sort-bar" value={props.sortCategory} onChange={props.sortHandler}>
            <option value="relevant">relevance</option>
            <option value="helpful">helpfulness</option>
            <option value="newest">newest</option>
          </select>
        </SortBar>
      </h3>
      <UnorderedList>
        {listReviewTiles}
      </UnorderedList>
      <ButtonContainer>
        {props.reviews.length <= 2 || props.reviewDisplayCount >= props.reviews.length
          ? null
          : <MoreReviewsButton onClick={props.getMoreReviews} > MORE REVIEWS </MoreReviewsButton>
        }
        <AddReviewButton onClick={() => addReviewClickHandler()}> ADD A REVIEW +</AddReviewButton>
      </ButtonContainer>
      {showReviewModal && <AddReviewModal addReviewClickHandler={ addReviewClickHandler} metadata={props.metadata} productName={productName}></AddReviewModal>}
    </>

  )
}