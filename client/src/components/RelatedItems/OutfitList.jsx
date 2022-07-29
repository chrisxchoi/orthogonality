/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { IDContext } from '../App.jsx';
import axios from 'axios';
import styled from 'styled-components';
import OutfitCard from './OutfitCard.jsx'
import { BsPlus } from 'react-icons/bs';
import { FaAngleDoubleRight, FaAngleDoubleLeft} from 'react-icons/fa';
import { IoIosStar, IoIosStarOutline} from 'react-icons/io';

const OutfitCarousel = styled.div`
display: flex;
// width: 1300px;
// overflow: hidden;
align-items: center;
// justify-content: space-between;
`

const AddCard = styled.div`
// position: relative;
height: 300px;
width: 200px;
display: flex;
flex-direction: column;
align-items: center;
border: 2px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 15px;
margin-left: 18px;
margin-bottom: 30px;
// border-radius: 10px;
`

const AddProduct = styled.h1 `
// position: absolute;
left: 60px;
font-family: 'Source Sans Pro', sans-serif;
font-weight: 500;

`

const PlusIcon = styled(BsPlus)`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 300px;
width: 200px;
margin: 10px;
background-color: #e6feffa3;
// border-radius: 10px;
`

const RightArrow = styled(FaAngleDoubleRight)`
height: 50px;
width: 50px;
`

const LeftArrow = styled(FaAngleDoubleLeft)`
height: 50px;
width: 50px;
`

const HideArrow = styled(FaAngleDoubleLeft)`
height: 50px;
width: 50px;
visibility: hidden;
`
const FilledStars = styled.div`
width: 65%;
overflow: hidden;
position: absolute;
`

const StarRatings = styled.div`
position: relative;
display: inline-block;
`

const FilledStar = styled(IoIosStar)`
height: 25px;
width: 25px;
`

const BlankStar = styled(IoIosStarOutline)`
height: 25px;
width: 25px;
`


export default function OutfitList ({ setID }) {
  const [outfitList, setOutfitList] = useState([]);
  const [outfitLength, setOutfitLength] = useState([0, 3]);
  const [hoverStatus, setHoverStatus] = useState(false);
  const [productCache, setProductCache] = useState({});
  const [styleCache, setStyleCache] = useState({});
  const [reviewCache, setReviewCache] = useState({});
  // store axios data in here.if exists dont do fetch, if it doesnt then ddo fetch
  // set cache function in outfitlist. take in card info as paramater. pass into outfict card

  let productID = useContext(IDContext);
  let slicedOutfitList = outfitList.slice(outfitLength[0], outfitLength[1]);

  const addToList = (id) => {
    if (outfitList.indexOf(id) === -1) {
      setOutfitList([...outfitList, id]);
      // console.log(outfitList);
    }
  }

  const removeFromList = (id) => {
    const newList = outfitList.filter((item) => item !== id);
    setOutfitList([...newList])
    // console.log('outfitlist: ', outfitList)
    // console.log(`REMOVED ${id}`)
  }

  const addProductCache = (id, obj) => {
      setProductCache({...productCache, [id]: obj});
  }

  const addStyleCache = (id, obj) => {
    if (!styleCache[id]) {
      setStyleCache({...styleCache, [id]: obj});
    }
  }

  const addReviewCache = (id, data) => {
    setReviewCache({...reviewCache, [id]: data});
}

  const moveOutfit = (arrow) => {
    if (arrow === 'left') {
      setOutfitLength([outfitLength[0] - 1, outfitLength[1] - 1])
      slicedOutfitList = outfitList.slice(outfitLength[0], outfitLength[1])
      // console.log(outfitLength)
    } else {
      setOutfitLength([outfitLength[0] + 1, outfitLength[1] + 1])
      slicedOutfitList = outfitList.slice(outfitLength[0], outfitLength[1])
      // console.log(outfitLength)
    }
  }


  return (
    <div>
      {/* <StarRatings>
        <FilledStars><FilledStar /></FilledStars>
        <div><BlankStar /></div>
      </StarRatings> */}
      <OutfitCarousel>
      {outfitLength[0] > 0 ? <LeftArrow onClick={() => moveOutfit('left')}/> : <HideArrow />}
      <AddCard onClick={() => addToList(productID)}><PlusIcon /><div><AddProduct>Add to Fit!</AddProduct></div></AddCard>
      {slicedOutfitList.map((item, index) => (
          <OutfitCard id={item} key={index} setID={setID} removeFromList={removeFromList} addProductCache={addProductCache} addStyleCache={addStyleCache} addReviewCache={addReviewCache} productCache={productCache} styleCache={styleCache} reviewCache={reviewCache}/>
        ))}
        {outfitLength[1] < outfitList.length ? <RightArrow onClick={() => moveOutfit('right')}/> : <HideArrow />}
      </OutfitCarousel>
    </div>

  )
}



//   const adding = () => {
//     addToList(productID);
//   }

//   const removing = () => {
//   removeFromList(productID);
//   }

//  const seeChange = () => {
//    console.log(outfitList)
//  }



{/* <OutfitCarousel>
        {outfitList.map((item, index) => (
          <div key={index} >
            {item === 1 ? <AddCard onClick={() => addToList(productID)}><PlusIcon /><div><AddProduct>Add to Fit!</AddProduct></div></AddCard> :
            <OutfitCard>
            <PrimaryImage src={outfitStyleInfo.image} onMouseEnter={onHover} onMouseLeave={offHover} onClick={() => setID(item)}></PrimaryImage>
            {hoverStatus ? <div>Thumbnail photos go here</div> : <div onClick={() => setID(item)}><div>{outfitProductInfo.category}</div>
            <div >{outfitProductInfo.name}</div>
            {outfitStyleInfo.sale_price !== null ?
            <div><StrikePrice>{outfitStyleInfo.default_price}</StrikePrice><SalesPrice>{outfitStyleInfo.sale_price}</SalesPrice></div> : <div>{outfitStyleInfo.default_price}</div>}
            <div>Star rating goes here</div></div>}
          </OutfitCard>
            }
          </div>
        ))}
      </OutfitCarousel> */}

              {/* {outfitList.map((item, index) => (
          <OutfitCard id={item} key={index} setID={setID} outfitProductInfo={outfitProductInfo} outfitStyleInfo={outfitStyleInfo}
          addToList={addToList} removeFromList={removeFromList} hasLoaded={hasLoaded}/>
        ))} */}