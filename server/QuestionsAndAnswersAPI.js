const axios = require('axios');
const config = require('../config.js')

const options = {
  headers: {
    'Authorization': config.TOKEN
  }
}

exports.getQuestions = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;
  let questionOptions = {
    headers: {
      'Authorization': config.TOKEN
    },
    params: {
      product_id: Number(req.query.product_id),
      page: Number(req.query.page) || 1,
      count: Number(req.query.count) || 100
    }
  }
  axios.get(url, questionOptions)
    .then((response) => { res.status(200).send(response.data.results); })
    .catch((err) => { console.log(err); res.status(400).send(err); });
}

exports.getAnswers = (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 100;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/answers?page=${page}&count=${count}`;
  axios.get(url, options)
    .then((response) => { res.status(201).send(response.data.results); })
    .catch((err) => { console.log(err); res.status(400).send(err); });
}

exports.postQuestion = (req, res) => {
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/';
  axios.post(url, req.body, options)
    .then(() => { res.status(201).send('successfully posted question'); })
    .catch((err) => { res.status(400).send(err); });
}

exports.postAnswer = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/answers`;
  axios.post(url, req.body, options)
    .then(() => { res.status(201).send('successfully posted answer'); })
    .catch((err) => { res.status(400).send(err); });
}

exports.markQuestionHelpful = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/helpful`;
  axios.put(url, req.params, options)
    .then(() => { res.status(204).send('successfully marked question helpful'); })
    .catch((err) => { res.status(400).send(err); });
}

exports.reportQuestion = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/report`;
  axios.put(url, req.params, options)
    .then(() => { res.status(204).send('successfully reported question'); })
    .catch((err) => { res.status(400).send(err); });
}

exports.markAnswerHelpful = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.params.answer_id}/helpful`;
  axios.put(url, req.params, options)
    .then(() => { res.status(204).send('successfully marked answer helpful'); })
    .catch((err) => { res.status(400).send(err); });
}

exports.reportAnswer = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.params.answer_id}/report`;
  axios.put(url, req.params, options)
    .then(() => { res.status(204).send('successfully reported answer'); })
    .catch((err) => { res.status(400).send(err); });
}