import React from 'react';
import styled from 'styled-components';
import FeaturesBar from './FeaturesBar.jsx'

const FeaturesBarContainer = styled.ul`
  width: 100%;
  list-style-type: none;
  padding-left: 0;
  margin-top: 0px;
`
const FeaturesListItem = styled.li`
  margin: 12px 0;
  font-size: 11px;
  & :first-of-type {
    margin-top: 2px;
  }
`

export default function FeaturesBox(props) {

  let labelDescs = {
    Size: ['A size too small', 'Perfect', 'A size too wide'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Comfort: ['Uncomfortable', 'Okay', 'Perfect'],
    Quality: ['Poor', 'What I expected', 'Perfect'],
    Length: ['Runs Short', 'Perfect', 'Runs long'],
    Fit: ['Runs tight', 'Perfect', 'Runs long']
  }

  let labels = Object.keys(props.metadata.characteristics);

  const generateFeatureBars = labels.map((label) => {
    return (
      <FeaturesListItem key={label}><FeaturesBar key={label} labelDescs={labelDescs[label]} labelName={label} sliderValue={props.metadata.characteristics[label].value}></FeaturesBar></FeaturesListItem>
    )
  })

  return (
    <FeaturesBarContainer>
      {generateFeatureBars}
    </FeaturesBarContainer>
  )
}