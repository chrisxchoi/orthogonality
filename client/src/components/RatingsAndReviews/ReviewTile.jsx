import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dateHandler from '../../lib/dateHandler.js';
import AverageStars from '../AverageStars.jsx';

const TileDiv = styled.div`
  color: black;
  padding-top: 35px;
  padding-bottom: 20px;
  padding-right: 10px;
`
const StarsAndUserInfoBar = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  padding-right: 5px;
  font-size: 13px;

  div:nth-child(2) {
    opacity: 0.7
  }
`
const ReviewSummary = styled.h4`
  box-sizing: border-box;
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 12px;
`
const ReviewBody = styled.div`
  box-sizing: border-box;
  text-align: left;
  p {
    margin: 0;
    word-break: break-all;
  }
  margin-bottom: 14px;
`
const ExpandReviewsButton = styled.button`
  display: ${props => props.readMoreClicked ? 'none' : 'block'};
  background-color: transparent;
  margin: 0;
  padding: 0;
  border-width: 0;
  color: rgb(19, 107, 234);
  display: inline-block;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    text-decoration: underline;
  }
  position: relative;
  bottom: 0.4em;
`
const PhotoCarousel = styled.div`
  display: flex;
  box-sizing: border-box;
  gap: 8px;

  img {
    object-fit: cover;
    height: 80px;
    width: 10%
  }
`
const LightBox = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.80);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    width: 50%;
    height: 50%;
  }
`
const Recommended = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-top: 22px;
  margin-bottom: 8px;
  font-size: 0.95em;
  svg {
    height: 18px;
    margin-right: 4px;
    position: relative;
    bottom: .10em;
  }
  align-content: center;
`
const SellerResponse = styled.div`
  background-color: grey;
`
const Helpfulness = styled.div`
  box-sizing: border-box;
  padding-top: 6px;
  font-size: 12px;
  opacity: 0.7;

  & a:nth-child(2) {
    margin-left: 4px;
  }

  & a:nth-child(3) {
    margin-left: 4px;
  }
`
const HelpfulnessDivider = styled.span`
  margin-left: 9px;
  margin-right: 9px;
  font-size: 13px;
  vertical-align: bottom;
  position: relative;
  top: 1px;
`
const AverageStarsContainer = styled.div`
display: flex;
justify-content: flex-start;
  svg {
    height: 17px;
    width: 17px;
  }
`
const UserInfo = styled.div`
  position: relative;
  bottom: 5px;
`

export default function ReviewTile(props) {
  let [isReadMore, setIsReadMore] = useState(false);
  let [lightBoxDisplay, setLightBoxDisplay] = useState(false);
  let [imageToShow, setImageToShow] = useState('');
  let [helpfulnessCount, setHelpfulnessCount] = useState(props.review.helpfulness);
  let [helpfulnessClicked, setHelpfulnessClicked] = useState(false);
  let [reportedClicked, setReportedClicked] = useState(false);

  let date = dateHandler(props.review.date)

  const RenderDescription = () => {
    if (props.review.body.length > 250) {
      return (
        <ReviewBody>
          <p>{isReadMore ? props.review.body : props.review.body.slice(0, 247) + '...'}</p>
          {!isReadMore
            ? <ExpandReviewsButton onClick={() => setIsReadMore(true)}>Read more</ExpandReviewsButton>
            : null}
        </ReviewBody>
      )
    }
    return (
      <ReviewBody>
        <p>{props.review.body}</p>
      </ReviewBody>
    )
  }

  const listPhotos = props.review.photos.map((photo) =>
    <img key={photo.url} src={photo.url} onClick={() => showImage(photo.url)}></img>
  )

  const showImage = (image) => {
    setImageToShow(image);

    setLightBoxDisplay(true);
  }

  const closeImage = () => {
    setLightBoxDisplay(false);
  }

  const markAsHelpful = (e) => {
    e.preventDefault();
    if (!helpfulnessClicked) {
      axios.put(`/reviews/${props.review.review_id}/helpful`)
        .then((response) => {
          console.log('RESPONSE IS...', response)
          if (response.status === 204) {
            setHelpfulnessCount(helpfulnessCount + 1);
            setHelpfulnessClicked(true);
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  const markAsReported = (e) => {
    e.preventDefault();
    if (!reportedClicked) {
      axios.put(`/reviews/${props.review.review_id}/report`)
        .then((response) => {
          console.log('RESPONSE IS...', response)
          if (response.status === 204) {
            setReportedClicked(true);
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  return (
    <TileDiv>
      <StarsAndUserInfoBar>
        <AverageStarsContainer><AverageStars rating={props.review.rating}></AverageStars></AverageStarsContainer>
        <UserInfo>{props.review.reviewer_name}, {date}</UserInfo>
      </StarsAndUserInfoBar>
      <ReviewSummary>
        {props.review.summary}
      </ReviewSummary>
      {RenderDescription()}
      {listPhotos.length > 0
        ? <PhotoCarousel>
          {listPhotos}
        </PhotoCarousel>
        : ''
      }
      {lightBoxDisplay
        ? <LightBox onClick={closeImage}>
          <img id="lightbox-img" src={imageToShow} onClick={closeImage}></img>
        </LightBox>
        : ''
      }
      {props.review.recommend
        ? <Recommended>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          I recommend this product
        </Recommended>
        : ''
      }
      {props.review.response
        ? <SellerResponse>
          <h5>Response:</h5>
          <p>{props.review.response}</p>
        </SellerResponse>
        : ''
      }
      <Helpfulness>
        <span>Helpful? </span>
        <a href="#" onClick={markAsHelpful}>Yes</a> ({helpfulnessCount})
        <HelpfulnessDivider> | </HelpfulnessDivider>
        <a href="#" onClick={markAsReported}>Report</a>
      </Helpfulness>
    </TileDiv>
  )
}