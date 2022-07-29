/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { IDContext } from '../App.jsx';
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx'
import RelatedListCarousel from './RelatedListCarousel.jsx'
import styled from 'styled-components';
import OutfitList from './OutfitList.jsx'
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
// body {
//   font-family: 'Source Sans Pro', sans-serif;
// }
// `


export const RelatedContext = React.createContext()

const Headers = styled.h2`
font-family: 'Source Sans Pro', sans-serif;
font-weight: 700;
`

const RelatedItemsContainer = styled.div`
// margin-left: 200px;
// margin-right: 200px;
// margin-top: 15px;
display: flex;
flex-direction: column;
`

const RelatedCarousel = styled.div`
display: flex;
max-width: 1300px;
overflow: scroll;
`

export default function RelatedItems({ setID }) {
  // will need product ID of current product
  // grab related products of current produt
  // related products for 40344: 40345, 40346, 40351, 40350
  const [relatedItems, setRelatedItems] = useState([40345, 40346, 40351, 40350]);
  const [currentFeatures, setCurrentFeatures] = useState([{feature: 'Fabric', value: 'Canvas'}, {feature: 'Buttons', value: 'Brass'}])

  let productID = useContext(IDContext)

  const getRelatedItems = () => {
    axios.get('/productsrelated', {params: {product_id: productID}})
    .then((res) => {
      let uniqueRelated = Array.from(new Set(res.data));
      // console.log('new response: ', res.data)
      // console.log('unique set: ', uniqueRelated)
      setRelatedItems(uniqueRelated);
    })
  }

  const getCurrentFeatures = () => {
    axios.get(`/products/${productID}`)
      .then((res) => {
      setCurrentFeatures(res.data.features);
    })
    .catch(() => {
      console.log('GET request failed for getCurrentFeatures')
    })
  }

  // run getRelatedItems whenever selected productID changes
  useEffect(() => {
    getRelatedItems();
    getCurrentFeatures();
  }, [productID]);


  return (
    <RelatedContext.Provider value={relatedItems}>
    <RelatedItemsContainer>
      {/* <GlobalStyle /> */}
      <div>
        <Headers>RELATED PRODUCTS</Headers>
          <RelatedListCarousel setID={setID} currentFeatures={currentFeatures} />
      </div>
      <div>
        <Headers>YOUR OUTFIT</Headers>
          <OutfitList setID={setID} />
      </div>
    </RelatedItemsContainer>
    </RelatedContext.Provider>
  )
}