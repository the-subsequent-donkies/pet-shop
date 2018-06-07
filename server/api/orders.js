'use strict'

const router = require('express').Router()
const { Order, LineItem } = require('../db/models')
const checkAccess = require('./checkAccess')
module.exports = router

// GET Routes
router.get('/', async (req, res, next) => {
  try {
    const response = await Order.findAll()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const response = await Order.findAll({
      where: { id: req.params.orderId },
      include: [{ model: LineItem, as: 'lineitems' }]
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

//POST routes
router.post('/', async (req, res, next) => {
  try {
    const addedOrder = await Order.create(req.body)
    res.status(201).json(addedOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    const addedOrder = await order.update(req.body)
    res.status(200).json(addedReview)
  } catch (err) {
    next(err)
  }
})
