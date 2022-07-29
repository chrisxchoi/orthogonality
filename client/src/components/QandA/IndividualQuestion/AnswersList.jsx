import React, { useState } from 'react';
import axios from 'axios';
import {format} from 'date-fns';
import styled from 'styled-components';

const Image = styled.img`
  border: 1px solid black;
  width: 120px;
  height: 100px;
  opacity: 1.0;
  margin-right: 5px;
`
const AnswerLower = styled.p`
  font-size: 12px;
  opacity: 0.7;
`

export default function AnswerList(props) {
  const [answerHelpfulness, setAnswerHelpfulness] = useState(props.answer.helpfulness);
  const [reported, setReported] = useState('Report');
  const [clicked, setClicked] = useState(false);

  const helpfulClick = (e) => {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      axios.put(`/qa/answers/${props.answer.answer_id}/helpful`)
        .then(() => {setAnswerHelpfulness(answerHelpfulness + 1)})
        .catch(err => console.log(err));
    }
  };

  const reportClick = (e) => {
    e.preventDefault();
    if (reported === 'Report') {
      axios.put(`/qa/answers/${props.answer.answer_id}/report`)
        .then(() => {setReported('Reported')})
        .catch(err => console.log(err));
    }
  };

  const renderPhotos = () => {
    if (props.answer.photos !== undefined) {
      return(
        <p>{props.answer.photos.map((photo) => (<Image src={photo.url} key={photo.id}/>))}</p>
      )
    }
  };


  return(
    <div>
      {props.answer.body}
      <AnswerLower>
        by {props.answer.answerer_name === 'Seller' ? <b>{props.answer.answerer_name}</b> : props.answer.answerer_name}, {format(new Date(props.answer.date), 'MM/dd/yyyy')} &emsp;|&emsp; Helpful? &nbsp; <a href='' onClick={helpfulClick}>Yes</a> {`(${answerHelpfulness})`} &emsp;|&emsp; <a href='' onClick={reportClick}>{reported}</a>
      </AnswerLower>
      {renderPhotos()}
    </div>
  )

}
