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
