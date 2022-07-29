import React from 'react';
import styled from 'styled-components';

const Descriptions = styled.div`
  display: flex;
  align-items: stretch;
  margin: 20px 0;
  margin-top: 5px;
`
const SingleDes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  font-size: 0.8em !important;
  gap: 8px;
`
const Characteristics = styled.div`
  font-color: inherit;
  font-size: 1em;
  padding-bottom: 0.5em;
  text-align: center;
`

export default function DescriptionBar(props) {

  const descriptionMap = {
    'Size': [
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too wide'
    ],
    'Width': [
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide'
    ],
    'Comfort': [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect'
    ],
    'Quality': [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect'
    ],
    'Length': [
      'Runs Short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long'
    ],
    'Fit': [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long']
  }

  const handleChange = (e) => {
    console.log('id', e.target.id)
    console.log('val', e.target.value)
    props.setCharacteristics(
      {...props.characteristics,
      [String(e.target.id)] : Number(e.target.value)
      }
    )
  }

  return (
    <>
      <Characteristics>
        {props.label}
      </Characteristics>
      <Descriptions>
        {descriptionMap[props.label].map((desc, index) => {
          return (
            <SingleDes key={index}>
              <input type="radio" id={props.id} name={props.label} value={index + 1} onChange={handleChange}></input>
              <div>{desc}</div>
            </SingleDes>
          )
        })}
      </Descriptions>
    </>
  )
}