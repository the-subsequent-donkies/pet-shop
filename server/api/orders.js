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
        {
          model: LineItem,
          as: 'line_items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const response = await Order.findOne({
      where: { id: req.params.orderId },
      include: [
        {
          model: LineItem,
          as: 'line_items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/me/:userId', (req, res, next) => {
  try {
    Order.find({
      where: {
        userId: +req.params.userId,
        status: 'Initialized',
      },
      include: [
        {
          model: LineItem,
          as: 'line_items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    }).then((foundOrder) => {
      foundOrder ?
        res.json(foundOrder) :
        Order.create({
          userId: +req.params.userId,
          status: 'Initialized',
          submittedAt: Date.now()
        })
          .then((createdOrder) => {
            return Order.findOne({
              where: {
                id: createdOrder.id
              },
              include: [
                {
                  model: LineItem,
                  as: 'line_items',
                  include: [{ model: Product, as: 'product' }]
                }
              ]
            })
          })
          .then((result) => {
            res.json(result)
          })
    })
  } catch (err) {
    next(err)
  }
})

//POST routes
router.post('/', async (req, res, next) => {
  try {
    const addedOrder = await Order.create({
      ...req.body,
      submittedAt: Date.now(),
      status: 'Initialized'
    })
    const gotOrder = await Order.findOne({
      where: {
        id: addedOrder.id
      },
      include: [
        {model: LineItem,
          as: 'line_items',
          include: [{ model: Product, as: 'product'}]}
      ]
    })
    console.log(gotOrder)
    res.status(201).json(gotOrder)

  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const { ...data } = req.body
    const order = await Order.findById(req.params.orderId)
    const updatedOrder = await order.update(data)
    res.status(200).json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
