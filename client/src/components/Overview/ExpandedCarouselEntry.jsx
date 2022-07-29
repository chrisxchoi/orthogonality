import React from 'react';
import styled from 'styled-components';
import { IoMdRemove, IoMdShirt } from 'react-icons/io';

const Image = styled.div`
  margin: 10px;
`

export default function ExpandedCarouselEntry (props) {

  const mappedIndex = props.photoArray.map((photo) => (photo.url)).indexOf(props.photo.url);

  return (
    <Image onClick={() => props.setCurrentIndex(mappedIndex)}>
    {props.currentIndex === mappedIndex ? <IoMdShirt/> : <IoMdRemove/>}
    </Image>
  )
}