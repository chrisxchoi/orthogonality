/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

const StarRatings = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 30px;
  margin-left: 6px;
`
const RatingStar = styled.div`
  width: ${props => props.fill}%;
  overflow: hidden;
  position: absolute;
  color: black;
`
const FilledStar = styled(IoIosStar)`
  height: 20px;
  width: 20px;
`
const BlankStar = styled(IoIosStarOutline)`
  height: 20px;
  width: 20px;
  color: black;
`

RatingStar.defaultProps = {
  fill: '100'
}

function AverageStars ({ rating }) {

  let filledStars = Math.floor(rating);
  let starArray = [];
  for (var i = 0 ; i < filledStars; i++) {
    starArray.push(100);
  }
  let partialFill = rating - filledStars;

  if (partialFill > 0.13) {
    if (partialFill <= 0.38) {
      starArray.push(40);
    } else if (partialFill <= 0.63) {
      starArray.push(52);
    } else if (partialFill <= 0.88) {
      starArray.push(63);
    }
  }

  while (starArray.length < 5) {
    starArray.push(0);
  }

  return (
    <StarRatings>
     { starArray.map((fill, i) => (
      <div key={i} style={{ position: 'absolute', left: i * 20 }}>
        <RatingStar fill={fill}>
          <FilledStar />
        </RatingStar>
        <BlankStar />
      </div>
    )) }
    </StarRatings>
  )
}

export default AverageStars;