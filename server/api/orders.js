'use strict'

const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
const checkAccess = require('./checkAccess')
module.exports = router

// GET Routes
router.get('/', async (req, res, next) => {
  try {
    const response = await Order.findAll({
      include: [
        {model: LineItem,
          as: 'line_items',
          include: [{ model: Product, as: 'product'}]}
      ]
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const response = await Order.findAll({
      where: { id: req.params.orderId },
      include: [
        {model: LineItem,
          as: 'line_items',
          include: [{ model: Product, as: 'product'}]}
      ]
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/me/:userId', async (req, res, next) => {
  try {
    Order.find({
      where: {
        userId: parseInt(req.params.userId),
        status: 'Initialized',
      },
      include: [
        {model: LineItem,
          as: 'line_items',
          include: [{ model: Product, as: 'product'}]}
      ]
    }).then((foundOrder) => {
      foundOrder ?
        res.json(foundOrder) :
        Order.create({
          userId: parseInt(req.params.userId),
          status: 'Initialized',
          submittedAt: Date.now()
        })
        .then((createdOrder) => {
          console.log('createdOrder: ', createdOrder)
          return Order.findOne({
            where: {
              id: createdOrder.id
            },
            include: [
              {model: LineItem,
                as: 'line_items',
                include: [{ model: Product, as: 'product'}]}
            ]
          })
        })
        .then((foundOrder) => {
          console.log('foundOrder>>>>>>>>>>>>>>>>>>>>.', foundOrder)
          res.json(foundOrder)
        })
    })
  } catch (e) {
    next(e)
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
