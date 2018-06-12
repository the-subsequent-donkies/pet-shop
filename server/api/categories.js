'use strict'

const router = require('express').Router()
const { Category } = require('../db/models')
const checkAccess = require('./checkAccess')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const response = await Category.findAll()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccess, async (req, res, next) => {
  const { name, description } = req.body
  try {
    const response = await Category.create({ name, description })
    res.json(response)
  } catch (err) {
    next(err)
  }
})
