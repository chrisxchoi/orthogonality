import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
const ModalContainer = styled.div`
  width: 510px;
  height: 440px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
`
const Title = styled.div`
  text-align: center;
  border-bottom: 1px solid rgba(210, 210, 210);
  margin-bottom: 15px;
`
const QuestionBody = styled.textarea`
  font-family: inherit;
  width: 100%;
  height: 150px;
  padding: 10px 10px;
  box-sizing: border-box;
  border-color: rgba(200, 200, 200);
  border-radius: 3px;
`
const Entries = styled.div`
  display: flex;
  width: 100%;
`
const EntryDivLeft = styled.div`
  flex: 1;
  margin-right: 8px;
`
const EntryDiv = styled.div`
  flex: 1;
`
const EntryInput = styled.input`
  width: 97%;
  border: solid rgba(200, 200, 200);
  border-radius: 3px;
  font-size: 14px;
`
const Authentication = styled.label`
  font-size: 10px;
  font-style: italic;
  opacity: 0.9;
`
const Label = styled.label`
  display: inline-block;
  margin-bottom: 4px;
  opacity: 0.8;
  font-size: 14px;
`
const QuestionContainer = styled.div`
  margin-bottom: 10px;
`
const Submit = styled.button`
  position: absolute;
  padding: 8px 10px;
  bottom: 15px;
  right: 10px;
  background: rgba(51, 204, 255);
  color: rgba(250, 250, 250);
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`
const Close = styled.button`
  position: absolute;
  padding: 8px 10px;
  bottom: 15px;
  right: 135px;
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`
const Header = styled.label`
  font-size: 18px;
`
const Subtitle = styled.p`
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 5px;
`

export default function QuestionModal(props) {
  const [questionForm, setQuestionForm] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleQuestionChange = (e) => {
    setQuestionForm(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/qa/questions', {
      body: questionForm,
      name: username,
      email: email,
      product_id: props.productID
    }).then(() => {
      axios.get('/qa/questions', {params: {product_id: props.productID}})
      .then((response) => {
        let sortedQuestions = response.data.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        props.setQuestionsList(sortedQuestions.slice(0, 4));
        props.setFullList(sortedQuestions);
        if (sortedQuestions.length <= 4) {
          props.setMoreQuestions(false);
        }
      })
      .catch(err => console.log(err))
    }).then(() => props.setOpenModal(false)).catch(err => console.log(err));
  }

  return(
    <ModalBackground>
      <ModalContainer>
        <form onSubmit={handleSubmit}>
          <Title>
            <Header>Ask Your Question</Header><br/>
            <Subtitle>About the {props.productName} here</Subtitle>
          </Title>
          <QuestionContainer>
            <Label>What is your question?</Label>
            <QuestionBody type='text' value={questionForm} onChange={handleQuestionChange} maxLength='1000' required />
          </QuestionContainer>
          <Entries>
            <EntryDivLeft>
              <Label>Username</Label>
              <EntryInput type='text' placeholder='Example: jackson11!' value={username} onChange={handleUsernameChange} maxLength='60' required />
            </EntryDivLeft>
            <EntryDiv>
              <Label>Email</Label>
              <EntryInput type='email' placeholder='Example: jack@email.com' value={email} onChange={handleEmailChange} maxLength='60' required />
              <Authentication>For authentication purposes, you will not be emailed.</Authentication>
            </EntryDiv>
          </Entries>
          <div>
            <Close onClick={() => props.setOpenModal(false)}>Close</Close>
            <Submit type='submit'>Submit Question</Submit>
          </div>
        </form>
      </ModalContainer>
    </ModalBackground>
  )
}