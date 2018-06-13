'use strict'

const router = require('express').Router()
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)
module.exports = router

router.post('/', (req, res) => {

  stripe.customers.create({
    email: req.body.email
  })
  .then(customer => console.log(customer))
})
