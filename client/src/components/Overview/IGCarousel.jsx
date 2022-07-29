import React, { useState} from 'react';
import styled from 'styled-components';
import IGCarouselEntry from './IGCarouselEntry.jsx';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const Container = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  max-width: 100px;
  min-height: 620px;
  overflow: hidden;
  margin-right: 32px;
  // margin-top: 50px;
`
const InvButton = styled(IoIosArrowUp)`
  visibility: hidden;
`
const Buttons = styled.div`
  align-self: center;
`

export default function IGCarousel (props) {

  const [carouselArray, setCarouselArray] = useState([0, 7]);

  const slicedArray = props.productStyle.photos.slice(carouselArray[0], carouselArray[1]);

  const stock = props.productStyle.photos[0].thumbnail_url;

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
      <Buttons>
        {carouselArray[0] > 0 ? <IoIosArrowUp onClick={() => handleCarousel('left')}/> : <InvButton/>}
      </Buttons>
      {stock !== null && slicedArray.map((photo, index) => (
        <IGCarouselEntry photoArray={props.productStyle.photos} currentIndex={props.currentIndex} key={index} setCurrentIndex={props.setCurrentIndex} photo={photo} />
      ))}
      <Buttons>
        {carouselArray[1] < props.productStyle.photos.length ? <IoIosArrowDown onClick={() => handleCarousel('right')}/> : <InvButton/>}
      </Buttons>
    </Container>
  )
}