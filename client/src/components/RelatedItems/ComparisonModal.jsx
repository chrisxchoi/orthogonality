/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { IDContext } from '../App.jsx';
import { HiX } from 'react-icons/hi';

const CompareTable = styled.table`
  position: absolute;
  z-index: 2;
  top: 900px;
  left: 570px;
  width: 700px;
  height: 540px;
  overflow: auto;
  background-color: rgba(245,245,245, .95);
  border: 2px solid lightgray;
  box-shadow: 7px 7px 7px lightgray;
  border-radius: 10px;
`
const CompareDiv = styled.div`
  left: 400px;
  top: 200px;
  width: 550px;
  height: 550px;
`
const ProductHeader = styled.th`
  text-align: center;
  font-weight: 600;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  border-bottom: solid;
`
const Comparison = styled.th`
  padding-left: 37px;
  font-weight: 600;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 22px;
`
const Features = styled.td`
text-align: center;
font-family: 'Source Sans Pro', sans-serif;
font-size: 18px;
`
const RelatedFeatures = styled.td`
width: 250px;
text-align: center;
font-family: 'Source Sans Pro', sans-serif;
font-size: 18px;
`
const CurrentFeatures = styled.td`
width: 250px;
text-align: center;
font-family: 'Source Sans Pro', sans-serif;
font-size: 18px;
`
const RemoveButton = styled(HiX)`
margin-top: 7px;
margin-right: 7px;
float: right;
height: 25px;
width: 25px;
`

export default function ComparisonModal ({id, relatedFeatures, currentFeatures, toggleCompare}) {
  const [allFeatures, setAllFeatures] = useState([]);
  const [featureValue, setFeatureValue] = useState('');
  const [relatedStatus, setRelatedStatus] = useState({});
  const [currentStatus, setCurrentStatus] = useState({});

  let featuresObj = {};
  let currentFeaturesObj = {};
  let relatedFeaturesObj = {};
  for (var i = 0; i < relatedFeatures.length; i++) {
    featuresObj[relatedFeatures[i].feature] = true;
    relatedFeaturesObj[relatedFeatures[i].feature] = [relatedFeatures[i].value]
  }
  for (var i = 0; i < currentFeatures.length; i++) {
    featuresObj[currentFeatures[i].feature] = true;
    currentFeaturesObj[currentFeatures[i].feature] = [currentFeatures[i].value]
  }
  let featuresArray = Object.keys(featuresObj);

  useEffect (() => {
    setAllFeatures(featuresArray);
  }, [])

  return (
    <div>
      <CompareTable>
        <thead>
          <tr>
            <Comparison colSpan={'3'}>Comparison<RemoveButton onClick={()=>toggleCompare()}></RemoveButton></Comparison>
          </tr>
        </thead>
        <thead>
          <tr>
            <ProductHeader>Current Product</ProductHeader>
            <th></th>
            <ProductHeader>Related Product</ProductHeader>
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, index) => (
            <tr key={index}>
              {currentFeaturesObj[feature] ? <CurrentFeatures>{currentFeaturesObj[feature]}</CurrentFeatures>: <td></td>}
              <Features>{feature}</Features>
              {relatedFeaturesObj[feature] ? <RelatedFeatures>{relatedFeaturesObj[feature]}</RelatedFeatures>: <td></td>}
            </tr>
            ))}
        </tbody>
      </CompareTable>
    </div>
  )
}