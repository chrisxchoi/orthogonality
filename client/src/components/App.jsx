/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from 'react';
import Overview from './Overview/Overview.jsx';
import QandA from './QandA/QandA.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import styled from 'styled-components';
import getReviewAvg from '../lib/getReviewAvg.js'
const axios = require('axios');
export const IDContext = React.createContext()


const Container = styled.div`
  font-family: Arial, sans-serif;
`
const Logo = styled.h1`
// width: 85%;
// margin: auto;
margin: -8px 120px 10px 120px;
// margin-left: 120px;
// margin-right: 120px;
padding-left: 168px;
padding-top: 8px;
padding-bottom: 8px;
// background-image: linear-gradient(to right, #ffe6fe , #00fbff6b);
background-image: linear-gradient(to right,#575b5442,#e6feff);
font-family: 'Bebas Neue';
// font-weight: lighter;
`

export default function App() {

  const [productID, setProductID] = useState(40344);
  const [styleID, setStyleID] = useState(240500);
  const [reviewAvg, setReviewAvg] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/products/${productID}/styles`)
      .then((response) => {
        setStyleID(response.data.results[0].style_id);
      })
      .catch((err) => {
        console.error(err)
      })

    axios.get('/reviews/meta', { params: { product_id: productID } })
      .then((response) => {
        setReviewAvg(getReviewAvg(response.data.ratings));
      })

    setPageLoaded(true);

  }, [productID])

  const setID = (id) => {
    setProductID(id);
  }

  const scrollToDiv = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const el1 = useRef();
  const el2 = useRef();

  return (

    <IDContext.Provider value={productID}>
      <Logo id="logo">HEVANIS</Logo>
      <Overview reviewAvg={reviewAvg} reference={el1} click={()=> scrollToDiv(el2)} styleID={styleID} setStyleID={setStyleID} setProductID={setProductID} productID={productID}/>
      {pageLoaded &&
          <Container id="master-container">
            <RelatedItems setID={setID} productID={productID}/>
            <QandA productID={productID}/>
            <RatingsAndReviews reference={el2} productID={productID} reviewAvg={reviewAvg} setReviewAvg={setReviewAvg} />
          </Container>
      }
    </IDContext.Provider>
  )
}
