const axios = require('axios');
const config = require('../config.js')

exports.listProducts = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products`;
    let options = {
      headers: {
        'Authorization': config.TOKEN
      },
      params: {
        page: req.query.page || 1,
        count: req.query.count || 7
      }
    };
    axios.get(url, options)
      .then((response) => {
        res.status(200).send(response.data)
      })
      .catch((err) => {
        res.status(400).send(err);
      })
}

exports.productInfo = (req, res) => {
  const product_id = req.params.product_id;
    let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}`;
    let options = {
      headers: {
        'Authorization': config.TOKEN
      }
    }
    axios.get(url, options)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.productStyles = (req, res) => {
  const product_id = req.params.product_id;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}/styles`;
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
}

exports.postCart = (req, res) => {
  const sku = req.body.sku_id;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart/`;
  let data = {sku_id: sku}
  let options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': config.TOKEN
    }};
  axios.post(url, data, options)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
}

exports.getCart = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`;
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    })
}
