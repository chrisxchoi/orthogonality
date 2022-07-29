import React, { useState } from 'react';
import styled from 'styled-components';
import ExpandedCarouselEntry from './ExpandedCarouselEntry.jsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Container = styled.div`
  align-self: center;
  display: flex;
  max-width: 750px;
  overflow: hidden;
  align-items: center;
`
const RightArrow = styled(IoIosArrowForward)`
  height: 25px;
  width: 25px;
`
const LeftArrow = styled(IoIosArrowBack)`
  height: 25px;
  width: 25px;
`
const HideArrow = styled(IoIosArrowBack)`
  height: 25px;
  width: 25px;
  visibility: hidden;
`

export default function ExpandedCarousel (props) {

  const [carouselArray, setCarouselArray] = useState([0, 7]);

  const slicedArray = props.productStyle.photos.slice(carouselArray[0], carouselArray[1]);

  const handleCarousel = (direction) => {
    if (direction === 'left') {
      setCarouselArray([carouselArray[0] - 1, carouselArray[1] - 1]);
      props.setCurrentIndex(prevCurrentIndex => prevCurrentIndex - 1);
    } else {
      setCarouselArray([carouselArray[0] + 1, carouselArray[1] + 1]);
      props.setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
    }
  }

  return (
    <Container>
      {carouselArray[0] > 0 ? <LeftArrow onClick={() => handleCarousel('left')}/> : <HideArrow />}
      {slicedArray.map((photo, index) => (
        <ExpandedCarouselEntry photoArray={props.productStyle.photos} currentIndex={props.currentIndex} key={index} setCurrentIndex={props.setCurrentIndex} photo={photo} />
      ))}
      {carouselArray[1] < props.productStyle.photos.length ? <RightArrow onClick={() => handleCarousel('right')}/> : <HideArrow />}
    </Container>
  )
}