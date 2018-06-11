'use strict'

const router = require('express').Router()
const { Order, LineItem, Product } = require('../db/models')
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
    const lineitem = req.body

    // Check if lineitem exists in db
    const foundItem = await LineItem.findOne({
      where: {
        productId: lineitem.productId,
        orderId: lineitem.orderId
      }
    })
    let addedItem
    if (foundItem) {
      const newQuant = foundItem.quantity + 1
      addedItem = await foundItem.update({quantity: newQuant})
    } else {
      addedItem = await LineItem.create({
        orderId: lineitem.orderId,
        quantity: lineitem.quantity,
        productId: lineitem.productId,
        currentPrice: lineitem.currentPrice
      })
    }
    const gotItem = await LineItem.findOne({
      where: {
        id: addedItem.id
      },
      include: [{
        model: Product, as: 'product'
      }]
    })
    res.status(201).json(gotItem)
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
