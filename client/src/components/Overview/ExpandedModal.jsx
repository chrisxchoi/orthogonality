import React, { useState } from 'react';
import styled from 'styled-components';
import ExpandedCarousel from './ExpandedCarousel.jsx';
import { FaRegTimesCircle } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const Content = styled.div`
  border: 2px solid lightgray;
  width: 1200px;
  background-color: #fff;
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Header = styled.div`
`
const Body = styled.img`
  max-height: 600px;
  cursor: cell;
`
const ZoomContainer = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  align-items: all;
  z-index: 1;
`
const ZoomArea = styled.figure`
  width: 1200px;
  height: 900px;
  overflow: hidden;
  border: 2px solid lightgray;
  position: relative;
  cursor: zoom-out;
`
const ZoomImg = styled.img`
  max-width: 100%;
  min-width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`
const Exit = styled(FaRegTimesCircle)`
  margin: 5px;
`

export default function ExpandedModal (props) {

  const [zoomIn, setZoomIn] = useState(false);

  const handleZoom = async (e) => {
    e.preventDefault();
    await setZoomIn(true);
    var zoom_area = document.getElementById("zoom_area");
    var zoom_img = document.getElementById("zoom_img");

    zoom_area.addEventListener("mousemove", function(event) {

      const Coordinates = {
        X: event.clientX - zoom_area.offsetLeft,
        Y: event.clientY - zoom_area.offsetTop
      }

      const ZoomCoord = Object.create(Coordinates);

      const mWidth = zoom_area.offsetWidth
      const mHeight = zoom_area.offsetHeight

      ZoomCoord.X = ( ZoomCoord.X / mWidth ) * 100
      ZoomCoord.Y = ( ZoomCoord.Y / mHeight ) * 100

      zoom_img.style.transform = 'translate(-'+ZoomCoord.X+'%, -'+ZoomCoord.Y+'%) scale(2.5)'
    })

    zoom_area.addEventListener("mouseleave", function() {
      zoom_img.style.transform = 'translate(-50%,-50%) scale(1)'
    })

  }

  return (
    <>
      {props.hasLoaded && <Container>
        <Content>
          <Header>
            <Exit onClick={()=> props.setShowModal(false)}/>
          </Header>
          <Body onClick={handleZoom} src={props.productStyle.photos[props.currentIndex].url}/>
          <ExpandedCarousel currentIndex={props.currentIndex} setCurrentIndex={props.setCurrentIndex} productStyle={props.productStyle}/>
        </Content>
      </Container>}
      {zoomIn && props.hasLoaded && <ZoomContainer>
        <ZoomArea onClick={()=> setZoomIn(false)} id="zoom_area">
          <ZoomImg id="zoom_img" src={props.productStyle.photos[props.currentIndex].url}/>
        </ZoomArea>
      </ZoomContainer>}
    </>
  )
}