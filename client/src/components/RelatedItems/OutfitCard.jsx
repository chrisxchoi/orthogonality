/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx'
import ThumbnailList from './ThumbnailList.jsx'
import { IDContext } from '../App.jsx';
import { HiX } from 'react-icons/hi';
import  AverageStars from '../AverageStars.jsx';
import calculateReviewAvg from '../../lib/calculateReviewAvg.js';

const PrimaryImage = styled.img`
display: flex;
position: relative;
z-index: 1
top: 0;
left: 0;
height: 280px;
width: 250px;
object-fit: contain;
margin: 7px 10px 10px 10px;
max-width: 100%;
background-color: #e6feffa3;
border-radius: 10px;
`
const PhotosContainer = styled.div`
position: relative;
display: flex;
align-items: flex-end;
justify-content: space-around;
`
const RemoveButton = styled(HiX)`
position: absolute;
top: 7px;
right: 10px;
height: 25px;
width: 25px;
`
const OutfitCardDiv = styled.div`
position: relative;
height: 400px;
width: 270px;
display: block;
align-items: center;
border: 2px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 15px;
margin-left: 15px;
margin-bottom: 30px;
`
const ProductCategory = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  color: gray;
  margin: 5px 10px 5px 8px;
`
const ProductPrice = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  color: gray;
  margin: 5px 10px 2px 8px;
`
const ProductName = styled.div`
  font-weight: 600;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  margin: 5px 10px 5px 8px;
`
const StrikePrice = styled.div`
float: left;
text-decoration: line-through;
text-decoration-thickness: 0.15rem;
font-family: 'Source Sans Pro', sans-serif;
color: gray;
margin: 5px 3px 2px 8px;
`
const SalesPrice = styled.div`
color: red;
font-family: 'Source Sans Pro', sans-serif;
margin: 5px 10px 2px 8px;
`

export default function OutfitCard({id, setID, removeFromList, addProductCache, addStyleCache, addReviewCache, productCache, styleCache, reviewCache}) {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [relatedStyleInfo, setRelatedStyleInfo] = useState([]);
  const [thumbnailPhotos, setThumbnailPhotos] = useState([]);
  const [dummyRating, setDummyRating] = useState(3.15);
  const [averageRating, setAverageRating] = useState('');

  let productID = id;

  const getOutfitInfo = () => {
    if (styleCache[productID]) {
      setRelatedProductInfo(productCache[productID])
      setRelatedStyleInfo(styleCache[productID])
      setAverageRating(reviewCache[productID])
      setHasLoaded(true)
    } else {
      axios.get(`/products/${productID}`)
      .then((res) => {
      let outfitLevelInfo = {name: res.data.name, category: res.data.category}
      setRelatedProductInfo(outfitLevelInfo);
      addProductCache(productID, outfitLevelInfo);
      })
      .catch(() => {
        console.log('GET request failed for outfitInfo')
      })
    axios.get(`/products/${productID}/styles`)
      .then((res) => {
      let primaryPhoto = '';
      if (res.data.results[0].photos[0].url === null) {
        primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
      } else {
        primaryPhoto = res.data.results[0].photos[0].url;
        setThumbnailPhotos(res.data.results[0].photos)
      }
      let styleInfo = {default_price: res.data.results[0].original_price, sale_price: res.data.results[0].sale_price, image: primaryPhoto}
      setRelatedStyleInfo(styleInfo);
      addStyleCache(productID, styleInfo);
      })
      .catch((err) => {
        console.log('GET request failed for outfitStyles')
      })
      axios.get('/reviews/meta', { params: { product_id: productID } })
      .then((response) => {
        let average = calculateReviewAvg(response.data.ratings)
        setAverageRating(calculateReviewAvg(response.data.ratings));
        addReviewCache(productID, average)
      })
      .then(() => {
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log('GET request failed for getAveragereview')
      })
    }
  }

  let onHover = () => {
    setHoverStatus(true);
  }

  let offHover = () => {
    setHoverStatus(false);
  }

  useEffect (() => {
    getOutfitInfo();
  }, [id])

  return (
    <div>
    {hasLoaded && <OutfitCardDiv>
              <PhotosContainer onMouseEnter={onHover} onMouseLeave={offHover}><PrimaryImage src={relatedStyleInfo.image} onClick={() => setID(id)}></PrimaryImage><RemoveButton onClick={() => removeFromList(id)}></RemoveButton>
              {hoverStatus ? <ThumbnailList id={id} setRelatedStyleInfo={setRelatedStyleInfo} thumbnailPhotos={thumbnailPhotos} relatedStyleInfo={relatedStyleInfo}/> : null}</PhotosContainer>
              <div onClick={() => setID(id)}><ProductCategory>{relatedProductInfo.category}</ProductCategory>
              <ProductName >{relatedProductInfo.name}</ProductName>
              {relatedStyleInfo.sale_price !== null ?
              <div>
                <StrikePrice>${relatedStyleInfo.default_price}</StrikePrice>
                <SalesPrice>${relatedStyleInfo.sale_price}</SalesPrice></div> : <ProductPrice>${relatedStyleInfo.default_price}</ProductPrice>}
                <AverageStars rating={averageRating} /></div>
            </OutfitCardDiv>}
    </div>
  )
}