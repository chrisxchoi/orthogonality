import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';
import styled from 'styled-components';
import AnswerModal from '../AnswerModal.jsx';

const Right = styled.div`
  float: right;
  font-size: 12px;
  opacity: 0.7;
`
const QuestionDiv = styled.div`
  margin-bottom: 10px;
`
const Container = styled.div`
  margin-bottom: 20px;
`
const A = styled.b`
  vertical-align: top;
`
const AnswerListContainer = styled.div`
  display: inline-block;
  font-size: 14px;
  opacity: 0.9;
  max-height: 40vh;
  overflow: auto;
`
const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-weight: bold;
  font-size: 12px;
  margin-left: 22px;
`

export default function Question(props) {
  const [answers, setAnswers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(true);
  const [buttonText, setButtonText] = useState('LOAD MORE ANSWERS');
  const [helpfulCount, setHelpfulCount] = useState(props.question.question_helpfulness);
  const [openAnswerModal, setOpenAnswerModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    axios.get(`/qa/questions/${props.question.question_id}/answers`)
      .then((response) => {
        let sortedHelpful = response.data.sort((a, b) => b.helpfulness - a.helpfulness);
        let sortedSeller = sortedHelpful.sort((a, b) => {
          const k1 = a.answerer_name === 'Seller' ? 1 : 0;
          const k2 = b.answerer_name === 'Seller' ? 1 : 0;
          return k2 - k1;
        });
        if (response.data.length <= 2) {
          setMoreAnswers(false);
        }
        setAnswers(sortedSeller.slice(0, 2));
        setAllAnswers(sortedSeller);
      })
      .catch(err => console.log(err));
  }, [])

  const helpfulClick = (e) => {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      axios.put(`/qa/questions/${props.question.question_id}/helpful`)
        .then(() => {setHelpfulCount(helpfulCount + 1)})
        .catch(err => console.log(err));
    }
  }

  const moreAnswersClick = (e) => {
    e.preventDefault();
    if (buttonText === 'LOAD MORE ANSWERS') {
      setAnswers(allAnswers);
      setButtonText('COLLAPSE ANSWERS');
    } else {
      setAnswers(allAnswers.slice(0, 2));
      setButtonText('LOAD MORE ANSWERS');
    }
  }

  const handleAddClick = (e) => {
    e.preventDefault();
    setOpenAnswerModal(true);
  }

  return(
    <Container>
      <QuestionDiv>
        <b>Q: {props.question.question_body}</b>
        <Right>
          Helpful? &nbsp;<a href='' onClick={helpfulClick}>Yes</a> {`(${helpfulCount})`} &emsp;|&emsp; <a href='' onClick={handleAddClick}>Add Answer</a>
        </Right>
        <br></br>
      </QuestionDiv>
      <div>
        {answers.length > 0 && <A>A: </A>}
        <AnswerListContainer>
          {answers.map((answer) => (<AnswersList answer={answer} key={answer.answer_id}/>))}
        </AnswerListContainer>
        <div>
          {moreAnswers && <Button onClick={moreAnswersClick}>{buttonText}</Button>}
        </div>
        {openAnswerModal && <AnswerModal setMoreAnswers={setMoreAnswers} setAnswers={setAnswers} setAllAnswers={setAllAnswers} question_id={props.question.question_id} setOpenAnswerModal={setOpenAnswerModal} question_body={props.question.question_body} productName={props.productName}/>}
      </div>
    </Container>
  )
}