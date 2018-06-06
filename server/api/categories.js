'use strict'

const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const response = await Category.findAll()
    res.json(response)
  } catch (err) {
    next(err)
  }
})
