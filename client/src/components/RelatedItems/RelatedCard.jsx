/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx'
import ThumbnailList from './ThumbnailList.jsx'
import { GiStaryu } from 'react-icons/gi';
import AverageStars from '../AverageStars.jsx';
import calculateReviewAvg from '../../lib/calculateReviewAvg.js';

export const CompareContext = React.createContext()

const PrimaryImage = styled.img`
display: flex;
// justify-content: center;
// align-items: center;
position: relative;
z-index: 1
top: 0;
left: 0;
height: 280px;
width: 250px;
object-fit: contain;
margin: 7px 10px 10px 10px;
// margin-top: 5px;
// margin-bottom: 10px;
max-width: 100%;
// background-color: #f0ffff;
// background-color: #e6feffa3;
// border-radius: 10px;
`

const ProductCategory = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  color: gray;
  margin: 5px 10px 5px 8px;
`

const ProductName = styled.div`
  font-weight: 600;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  margin: 5px 10px 5px 8px;
`

const PhotosContainer = styled.div`
position: relative;
display: flex;
align-items: flex-end;
justify-content: space-around;
`
const CompareButton = styled.button`
position: absolute;
z-index: 3;
left: 400px;
top: 880px;
`

const StarButton = styled(GiStaryu)`
position: absolute;
top: 7px;
right: 10px;
height: 25px;
width: 25px;
`

const RelatedItemsCard = styled.div`
position: relative;
// height: 500px;
width: 200px;
display: flex;
flex-direction: column;
align-items: center;
border: 2px solid lightgray;
// box-shadow: 7px 7px 7px ##e6feffa3;
box-shadow: 7px 7px 7px lightgray;
margin-right: 15px;
margin-left: 15px;
margin-bottom: 30px;
// border-radius: 10px;
`

const ProductPrice = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  color: gray;
  margin: 5px 10px 2px 8px;
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

export default function RelatedCard({id, setID, currentFeatures}) {
  const [relatedProductInfo, setRelatedProductInfo] = useState([]); // name, category, features, default price
  const [relatedStyleInfo, setRelatedStyleInfo] = useState([]); // sale price, photos
  const [hoverStatus, setHoverStatus] = useState(false);
  const [compareProducts, setCompareProducts] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [thumbnailPhotos, setThumbnailPhotos] = useState([]);
  const [dummyRating, setDummyRating] = useState(3.15);
  const [averageRating, setAverageRating] = useState('');


  const getRelatedInfo = () => {
    axios.get(`/products/${id}`)
      .then((res) => {
      // console.log('product level info: ', res.data);
      let relatedLevelInfo = {name: res.data.name, category: res.data.category, features: res.data.features}
      setRelatedProductInfo(relatedLevelInfo);
    })
    .catch(() => {
      console.log('GET request failed for relatedInfo')
    })
    axios.get(`/products/${id}/styles`)
      .then((res) => {
      // console.log('product styles: ', res.data);
      let primaryPhoto = '';
      if (res.data.results[0].photos[0].url === null) {
        primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
      } else {
        primaryPhoto = res.data.results[0].photos[0].url;
        setThumbnailPhotos(res.data.results[0].photos)
      }
      let styleInfo = {default_price: res.data.results[0].original_price, sale_price: res.data.results[0].sale_price, image: primaryPhoto}
      setRelatedStyleInfo(styleInfo);
    })
    .then(() => {
      setHasLoaded(true)
    })
    .catch((err) => {
      console.log('GET request failed for productStyles')
    })
  }

  const getAveragereview = () => {
    axios.get('/reviews/meta', { params: { product_id: id } })
      .then((response) => {
        // console.log('review ratings: ', response.data.ratings)
        // console.log('average ratings: ', calculateReviewAvg(response.data.ratings))
        setAverageRating(calculateReviewAvg(response.data.ratings));
      })
      .catch((err) => {
        console.log('GET request failed for getAveragereview')
      })
  }

  useEffect(() => {
    getRelatedInfo();
    getAveragereview();
  }, [])

  useEffect(() => {
    getRelatedInfo();
    getAveragereview();
  }, [id])

  let onHover = () => {
    setHoverStatus(true);
  }
  let offHover = () => {
    setHoverStatus(false);
  }

  const toggleCompare = (status) => {
    if (status === 'true') {
      setCompareProducts(true);
    } else {
      setCompareProducts(false);
    }
  }

  return (
    <CompareContext.Provider value={compareProducts}>
      <div>
      {compareProducts ? <div><ComparisonModal id={id} relatedFeatures={relatedProductInfo.features} currentFeatures={currentFeatures} toggleCompare={toggleCompare}/></div> : null}
      {hasLoaded && <RelatedItemsCard>
        {/* <StarButton onClick={() => toggleCompare('true')}></StarButton> */}
        <PhotosContainer onMouseEnter={onHover} onMouseLeave={offHover}><PrimaryImage src={relatedStyleInfo.image} onClick={() => setID(id)}></PrimaryImage><StarButton onClick={() => toggleCompare('true')}></StarButton>
        {hoverStatus ? <ThumbnailList id={id} setRelatedStyleInfo={setRelatedStyleInfo} thumbnailPhotos={thumbnailPhotos} relatedStyleInfo={relatedStyleInfo}/> : null}</PhotosContainer>
        <div onClick={() => setID(id)}><ProductCategory>{relatedProductInfo.category}</ProductCategory>
        <ProductName>{relatedProductInfo.name}</ProductName>
        {relatedStyleInfo.sale_price !== null ?
        <div><StrikePrice>${relatedStyleInfo.default_price}</StrikePrice><SalesPrice>${relatedStyleInfo.sale_price}</SalesPrice></div> : <ProductPrice>${relatedStyleInfo.default_price}</ProductPrice>}
        <AverageStars rating={averageRating} /></div>
      </RelatedItemsCard>}
      </div>
    </CompareContext.Provider>
  )
}

// const getRelatedInfo = async () => {
  //   let productLevelInfo = await axios.get(`/products/${item}`)
  //     .then((res) => {
  //     console.log('product level info: ', res.data);
  //     return res.data;
  //   })
  //   .catch(() => {
  //     console.log('GET request failed for relatedInfo')
  //   })

  //   let productStyles = await axios.get(`/products/${item}/styles`)
  //     .then((res) => {
  //     // console.log('product styles: ', res.data);
  //     return res.data;
  //   })
  //   .catch(() => {
  //     console.log('GET request failed for productStyles')
  //   })

  //   let primaryPhoto = '';
  //   if (productStyles.results[0].photos[0].url === null) {
  //     primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
  //   } else {
  //     primaryPhoto = productStyles.results[0].photos[0].url;
  //   }

  //   let relatedInfo = {
  //     name: productLevelInfo.name,
  //     category: productLevelInfo.category,
  //     price: productStyles.results[0].original_price,
  //     image: primaryPhoto
  //   }

  //   await setRelatedProductInfo(relatedInfo)
  // }