/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

const ThumbnailImage = styled.img`
display: flex;
justify-content: center;
align-items: center;
position: relative;
height: 45px;
width: 35px;
object-fit: cover;
margin-left: 5px;
margin-right: 5px;
margin-bottom: 15px;
background-color: rgba(168,168,168,.7);
z-index: 1;
border: 1.5px solid white;
border-radius: 10px;
`
const RightArrow = styled(FaAngleDoubleRight)`
margin-bottom: 15px;
`
const LeftArrow = styled(FaAngleDoubleLeft)`
margin-bottom: 15px;
`
const HideArrow = styled(FaAngleDoubleLeft)`
visibility: hidden;
`
const Container = styled.div`
display: flex;
position: absolute;
align-items: center;
`

export default function ThumbnailList ({ id, setRelatedStyleInfo, thumbnailPhotos, relatedStyleInfo }) {
  const [thumbnailLength, setThumbnailLength] = useState([0, 4])
  let slicedThumbnail = thumbnailPhotos.slice(thumbnailLength[0], thumbnailLength[1]);

  const moveCarousel = (arrow) => {
    if (arrow === 'left') {
      setThumbnailLength([thumbnailLength[0] - 1, thumbnailLength[1] - 1])
    } else {
      setThumbnailLength([thumbnailLength[0] + 1, thumbnailLength[1] + 1])
    }
  }

  return (
    <Container>
      {thumbnailLength[0] > 0 ? <LeftArrow onClick={() => moveCarousel('left')}/> : <HideArrow />}
      {slicedThumbnail.map((photo, index) => (
        <ThumbnailImage key={index} src={photo.thumbnail_url} onClick={() => setRelatedStyleInfo({...relatedStyleInfo, image: photo.thumbnail_url})}/>
      ))}
      {thumbnailLength[1] < thumbnailPhotos.length ? <RightArrow onClick={() => moveCarousel('right')}/> : <HideArrow />}
    </Container>
  )
}