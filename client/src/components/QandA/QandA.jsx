import React from 'react';
import QuestionsList from './QuestionsList.jsx';

export default function QandA(props) {

  return(
    <div>
      <h2>QUESTIONS & ANSWERS</h2>
      <QuestionsList productID={props.productID}/>
    </div>
  )
}