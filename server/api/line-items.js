'use strict'

const router = require('express').Router()
const { Order, LineItem } = require('../db/models')
const checkAccess = require('./checkAccess')
module.exports = router

// GET Routes
router.get('/', async (req, res, next) => {
  try {
    const response = await LineItem.findAll()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const response = await LineItem.findAll({
      where: { orderId: req.params.orderId }
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

//POST routes
router.post('/', async (req, res, next) => {
  try {
    const addedItem = await LineItem.create(req.body)
    res.status(201).json(addedItem)
  } catch (err) {
    next(err)
  }
})

router.put('/:itemId', async (req, res, next) => {
  try {
    const item = await LineItem.findById(req.params.itemId)
    const addedItem = await item.update(req.body)
    res.status(200).json(addedItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const deletedItem = await LineItem.findById(req.params.itemId)
    const response = deletedItem.destroy()
    res.json(response)
  } catch (err) {
    next(err)
  }
})
