'use strict'

const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const { data } = await Product.findAll()
    res.json(data)
    console.log(data)
  } catch (err) {
    next(err)
  }
})

