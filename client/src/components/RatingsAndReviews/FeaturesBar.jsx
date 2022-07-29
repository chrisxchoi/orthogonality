import React from 'react';
import styled from 'styled-components';

const FeaturesNamesSlider = styled.div`
  display: flex;
  height: 8px;
  justify-content: space-between;
`
const FeaturesNameSegment = styled.span`
  height: 8px;
`
const Slider = styled.input`
  margin-top: 6px;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  margin-bottom: 0.5em;
  background: #d3d3d3;
  opacity: 0.7;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 12px solid #575b54;
  }
`
const LabelName = styled.div`
  padding-top: 0.75em;
  font-size: 1.2em;
`

export default function FeaturesBar(props) {
  return (
    <>
      <LabelName>
        {props.labelName}
      </LabelName>
      <Slider type="range" readOnly min="1" max="5" value={props.sliderValue}></Slider>
      <FeaturesNamesSlider>
        <FeaturesNameSegment>{props.labelDescs[0]}</FeaturesNameSegment>
        <FeaturesNameSegment>{props.labelDescs[1]}</FeaturesNameSegment>
        <FeaturesNameSegment>{props.labelDescs[2]}</FeaturesNameSegment>
      </FeaturesNamesSlider>
    </>
  )
}