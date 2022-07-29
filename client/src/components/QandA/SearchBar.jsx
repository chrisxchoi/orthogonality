import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  margin-bottom: 20px;
`
const Input = styled.input`
  width: 100%;
  padding: 18px 15px;
  box-sizing: border-box;
  border: 1px solid black;
`

export default function SearchBar(props) {
  const [entry, setEntry] = useState('');

  const filter = (text) => {
    let result = [];
    for (let question of props.questions) {
      if (question.question_body.toLowerCase().includes(text.toLowerCase())) {
        result.push(question);
      }
    }
    return result;
  }

  const handleChange = (e) => {
    setEntry(e.target.value);
    if (entry.length >= 3) {
      props.setQuestionsList(filter(entry));
    } else {
      props.setQuestionsList(props.questions.slice(0, props.count));
    }
  }

  return(
    <Form>
      <Input type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...' value={entry} onChange={handleChange} ></Input>
    </Form>
  )
}